import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../service/userService'
import { useNavigate } from 'react-router-dom'
import { createCart } from '../../service/cartService'

export default function Register() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    return (
        <>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    dispatch(registerUser(values)).then(({ payload }) => {
                        if (payload.message === "Username already exists") {
                            alert("Tài khoản đã tồn tại")
                        } else {
                            dispatch(createCart({
                                user: {
                                    id: payload.id,
                                    username: payload.username,
                                    name: payload.name,
                                    password: payload.password,
                                },
                                total: 0,
                                products: [],
                            })).then(() => {
                                alert("Đăng ký thành công")
                                navigate("/")
                            }) 
                        }
                    })
                }}
            >
                <Form>
                    <Field name='name' placeholder='Name' />
                    <Field name='username' placeholder='Username' />
                    <Field name='password' placeholder='Password' />
                    <button type='submit'>Sign up</button>
                    <button onClick={() => navigate("/")}>Login here</button>
                </Form>
            </Formik>
        </>
    )
}
