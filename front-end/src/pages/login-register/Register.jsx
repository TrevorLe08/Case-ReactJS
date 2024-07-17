import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../service/userService'
import { useNavigate } from 'react-router-dom'
import { createCart } from '../../service/cartService'
import * as Yup from 'yup'
import '../../style/login-register/Form.css'

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .required("*Required"),
        username: Yup.string()
            .required("*Required"),
        password: Yup.string()
            .min(8, "*Password is too short")
            .required("*Required")
    })

    return (
        <>

            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: ''
                }}
                validationSchema={registerSchema}
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
            ><div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-2xl text-[#f5f5f5] text-center mb-[30px]'>Sign up</p>
                        <Field className='input-login' name='name' placeholder='Name' />
                        <p className='text-base text-red-600 mb-2'><ErrorMessage name='name'/></p>
                        <Field className='input-login' name='username' placeholder='Username' />
                        <p className='text-base text-red-600 mb-2'><ErrorMessage name='username'/></p>
                        <Field className='input-login' name='password' placeholder='Password' type="password"/>
                        <p className='text-base text-red-600 mb-2'><ErrorMessage name='password'/></p>
                        <div className="grid justify-center">
                            <button className='btn-form-login' type='submit'>Sign up</button>
                            <span className='bg-transparent py-2 text-center text-base text-[#f5f5f5]'>-----or-----</span>
                            <button className='btn-form-login' onClick={() => navigate("/")}>Login here</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
