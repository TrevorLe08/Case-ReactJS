import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readCategory } from '../../../service/categoryService'
import { getProduct } from '../../../service/productService'
import { Field, Form, Formik } from 'formik'

export default function DetailCategory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentCategory } = useSelector(state => state.category)
    const { products } = useSelector(state => state.product)

    // Products change relying on name category
    const listProduct = products.filter(item => item.category.name === currentCategory.name)

    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(readCategory(id))
        }
        getData()
    }, [dispatch])
    return (
        <div>
            <button className='btn-back mx-2 bg-transparent' onClick={() => navigate("/admin/categories")}>Back</button>
            <Formik
                initialValues={currentCategory}
                enableReinitialize={true}
            >
                <div className='wrapper'>
                    <Form className='form-category'>
                        <p className='text-2xl font-medium text-center'>Detail category {id}</p>
                        <div>
                            <label className='form-label mr-12' htmlFor="name">ID:</label>
                            <Field className='form-input' name='id' disabled />
                        </div>
                        <div>
                            <label className='form-label mr-4' htmlFor="name">Name:</label>
                            <Field className='form-input' name='name' disabled />
                        </div>
                        <div>
                            <label className='form-label mr-4' htmlFor="products">List Products:</label>
                            {listProduct.length > 0 ? (
                                <table className='category-table'>
                                    <thead>
                                        <tr>
                                            <th className='category-th'>#</th>
                                            <th className='category-th'>Name</th>
                                            <th className='category-th'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProduct.map((item, index) => (
                                            <tr>
                                                <td className='category-td'>{index + 1}</td>
                                                <td className='category-td'>{item.name}</td>
                                                <td className='category-td'>{item.price}k</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className='text-xl font-medium text-center'>Products is empty ._.</p>
                            )}
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
