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
    const categoryName = currentProduct.category.name

    useEffect(() => {
        const getData = () => {
            dispatch(readProduct(id))
            dispatch(getCategory())
        }
        getData()
    }, [])
    return (
        <div>
            <h2>Edit product {id}</h2>
            <button onClick={() => navigate("/admin/products")}>Back</button>
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
                        images: []
                    }
                    dispatch(updateProduct(values)).then(() => {
                        alert("Lưu thành công")
                        navigate("/admin/products")
                    })
                }}
            >
                <Form>
                    <Field name='name' placeholder='Name' />
                    <Field name='price' placeholder='Price' type="number" />
                    <Field name='quantity' placeholder='quantity' type="number" />
                    <Field as="select" name='category.name'>
                        {categories.map((category) => (
                            <option value={category.name} key={category.id}>{category.name}</option>
                        ))}
                    </Field>
                    <button type='submit'>Save</button>
                </Form>
            </Formik>
        </div>
    )
}
