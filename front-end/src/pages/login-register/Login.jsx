import React, { useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../service/userService'
import { useNavigate } from 'react-router-dom'
import { getCarts } from '../../service/cartService'
import { getProduct } from '../../service/productService'
import { getItem } from '../../redux/slices/productsSlice'
import { getCategory } from '../../service/categoryService'
import * as Yup from 'yup'
import '../../style/login-register/Form.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required("*Required"),
        password: Yup.string()
            .min(8, "*Password is too short")
            .required("*Required")
    })

    useEffect(() => {
        const getData = () => {
            dispatch(getCarts())
            dispatch(getProduct())
            dispatch(getItem())
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                    dispatch(loginUser(values)).then(({ payload }) => {
                        if (payload.message === "Invalid username or password") {
                            alert("Mật khẩu hoặc username không chính xác");
                        } else {
                            alert("Đăng nhập thành công");
                            payload.user.isAdmin ? navigate("/admin") : navigate("/home/us")
                        }
                    })
                }}
            >
                <div className='min-h-screen flex items-center justify-center'>
                    <Form className='form-login'>
                        <p className='bg-transparent text-2xl text-[#f5f5f5] text-center mb-[30px]'>Login</p>
                        <Field className='input-login' name='username' placeholder='Username' />
                        <p className='text-base text-red-600 mb-2'><ErrorMessage name='username'/></p>
                        <Field className='input-login' name='password' placeholder='Password' type="password"/>
                        <p className='text-base text-red-600 mb-2'><ErrorMessage name='password'/></p>
                        <div className='grid justify-center'>
                            <button className='btn-form-login' type='submit'>Log in</button>
                            <span className='bg-transparent py-2 text-center text-base text-[#f5f5f5]'>-----or-----</span>
                            <button className='btn-form-login' type='button' onClick={() => navigate("/register")}>Register here</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
