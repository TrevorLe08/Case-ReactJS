import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct, updateProduct } from '../../../service/productService'
import { Formik, Form, Field } from 'formik'
import { getCategory } from '../../../service/categoryService'

export default function EditProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { currentProduct } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)

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
                onSubmit={(values) => {
                    values = {
                        ...values,
                        category: {
                            id: categories.find(e => e.name === values.category.name).id,
                            name: values.category.name
                        },
                    }
                    dispatch(updateProduct(values)).then(() => {
                        alert("Lưu thành công")
                        navigate("/admin/products")
                    })
                }}
            >
                <div className="wrapper">
                    <Form className='form-product'>
                        <p className='text-2xl font-medium text-center'>Edit Product ID: {id}</p>
                        <div>
                            <label htmlFor="name" className='form-label mr-7'>Name:</label>
                            <Field className="form-input" name='name' placeholder='Enter name...' />
                        </div>
                        <div>
                            <label htmlFor="price" className='form-label mr-9'>Price:</label>
                            <Field className="form-input" name='price' placeholder='Enter price...' type="number" />
                        </div>
                        <div>
                            <label htmlFor="quantity" className='form-label mr-2'>Quantity:</label>
                            <Field className="form-input" name='quantity' placeholder='Enter quantity...' type="number" />
                        </div>
                        <div>
                            <label className="form-label mr-2 ">Category:</label>
                            <Field as="select" name='category.name' className="form-select mb-4 mt-2">
                                {categories.map((category) => (
                                    <option value={category.name} key={category.id}>{category.name}</option>
                                ))}
                            </Field>
                        </div>
                        <button className='btn-submit' type='submit'>Save</button>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
