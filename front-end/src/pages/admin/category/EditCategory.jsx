import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { readCategory, updateCategory } from '../../../service/categoryService'

export default function EditCategory() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentCategory } = useSelector(state => state.category)

    useEffect(() => {
        const getData = () => dispatch(readCategory(id))
        getData()
    }, [dispatch])
    return (
        <div>
            <button className='btn-back mx-2 bg-transparent' onClick={() => navigate("/admin/categories")}>Back</button>
            <Formik
                initialValues={currentCategory}
                enableReinitialize={true}
                onSubmit={(values) => {
                    dispatch(updateCategory(values)).then(() => {
                        alert("Lưu thành công")
                        navigate("/admin/categories")
                    })
                }}
            >
                <div className='wrapper'>
                    <Form className='form-category'>
                        <p className='text-2xl font-medium text-center'>Edit category {id}</p>
                        <div>
                            <label className='form-label mr-4' htmlFor="name">Name:</label>
                            <Field className='form-input' name='name' />
                        </div>
                        <button className='btn-submit mt-2' type="submit">Save</button>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}
