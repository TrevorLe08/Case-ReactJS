import React, { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Form,Formik,Field} from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { readCategory, updateCategory } from '../../../service/categoryService'

export default function EditCategory() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentCategory} = useSelector(state => state.category)

    useEffect(() => {
        const getData = () => dispatch(readCategory(id))
        getData()
    },[])
    return (
        <div>
            <h2>Edit category {id}</h2>
            <button type="button" onClick={() => navigate("/admin/categories")}>Back</button>
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
                <Form>
                    <Field name='name'/>
                    <button type="submit">Save</button>
                </Form>
            </Formik>
        </div>
    )
}
