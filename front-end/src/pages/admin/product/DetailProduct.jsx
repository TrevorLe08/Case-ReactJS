import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../service/productService'
import { Field, Form, Formik } from 'formik'
import { getCategory } from '../../../service/categoryService'

export default function DetailProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { id } = useParams()
    const { currentProduct } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)
    const [current, setCurrent] = useState(0)

    const changeSlide = (action) => {
        if (action === "previous") {
            if (current === 0) {
                setCurrent(currentProduct.images.length - 1)
            } else {
                setCurrent(current - 1)
            }
        } else {
            if (current === currentProduct.images.length - 1) {
                setCurrent(0)
            } else {
                setCurrent(current + 1)
            }
        }
    }

    useEffect(() => {
        const getData = () => {
            dispatch(readProduct(id))
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])
    return (
        <div>
            <button className='btn-back mx-2 bg-transparent' onClick={() => navigate("/admin/products")}>
                <i className="bi bi-arrow-return-left mr-2"></i>
                <span>Back</span>
            </button>
            <Formik
                initialValues={currentProduct}
                enableReinitialize={true}
            >
                <div className="wrapper">
                    <Form className='form-product w-[600px]'>
                        <p className='text-2xl font-medium text-center'>Detail Product ID: {id}</p>
                        <div>
                            <label htmlFor="name" className='form-label mr-7'>Name:</label>
                            <Field className="form-input" name='name' placeholder='Enter name...' disabled />
                        </div>
                        <div>
                            <label htmlFor="price" className='form-label mr-9'>Price:</label>
                            <Field className="form-input" name='price' placeholder='Enter price...' type="number" disabled />
                        </div>
                        <div>
                            <label htmlFor="quantity" className='form-label mr-2'>Quantity:</label>
                            <Field className="form-input" name='quantity' placeholder='Enter quantity...' type="number" disabled />
                        </div>
                        <div>
                            <label className="form-label mr-2 ">Category:</label>
                            <Field as="select" name='category.name' className="form-select mb-4 mt-2">
                                {categories.map((category) => (
                                    <option value={category.name} key={category.id} disabled>{category.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div>
                            <p className='form-label mr-2 '>Images: </p>
                            <div className="relative w-3/4 h-auto mx-auto border-black border-[1px] rounded-lg">
                                <div className='relative overflow-hidden'>
                                    <div 
                                    className='flex transition duration-700 ease-in-out'
                                    style={{
                                        transform: `translateX(-${current * 100}%)`
                                    }}
                                    >
                                        {currentProduct.images.map((url, index) => (
                                            <img key={index} src={url} alt="Products" className='rounded-xl ' />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    onClick={() => changeSlide("previous")}
                                >
                                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 group-hover:bg-gray-500  group-focus:ring-4 group-focus:ring-gray-200 group-focus:outline-none">
                                        <i className="bi bi-caret-left-fill text-2xl text-black"></i>
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                                    onClick={() => changeSlide("next")}
                                >
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 group-hover:bg-gray-500 group-focus:ring-4 group-focus:ring-gray-200 group-focus:outline-none">
                                        <i className="bi bi-caret-right-fill text-2xl text-black"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
