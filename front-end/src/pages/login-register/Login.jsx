import React, { useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../service/userService'
import { useNavigate } from 'react-router-dom'
import { getCarts } from '../../service/cartService'
import { getProduct } from '../../service/productService'
import { getItem } from '../../redux/slices/productsSlice'
import { getCategory } from '../../service/categoryService'

export default function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    
    useEffect(() => {
        const getData = () => {
            dispatch(getCarts())
            dispatch(getProduct())
            dispatch(getItem())
            dispatch(getCategory())
        }
        getData()
    },[dispatch])
    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
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
                <Form>
                    <Field name='username' placeholder='Username' />
                    <Field name='password' placeholder='Password' />
                    <button type='submit'>Log in</button>
                    <button type='button' onClick={() => navigate("/register")}>Register here</button>
                </Form>
            </Formik>
        </>
    )
}
