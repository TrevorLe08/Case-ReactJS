import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../../service/categoryService'
import { createProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { imageStorage } from '../../../config/firebase'

export default function AddProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    const [msg,setMsg] = useState("")
    let imgList = []
    let imgUrl = []

    const handleUploadImg = async (list) => {
        list.forEach(img => {
            const imgRef = ref(imageStorage, `images/${img.name + v4()}`)
            uploadBytes(imgRef, img).then((value) => {
                getDownloadURL(value.ref).then((url) => {
                    imgUrl = [...imgUrl,url]
                })
            })
        })
    }
    useEffect(() => {
        const getData = () => dispatch(getCategory())
        getData()
    }, [])
    return (
        <div>
            <h2>Add product</h2>
            <button onClick={() => navigate("/admin/products")}>Back</button>
            <br />
            <br />
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    quantity: '',
                    category: {
                        name: categories[0].name
                    },
                }}
                onSubmit={(values) => {
                    if (imgList !== null) {
                        setMsg("Loading...")
                        handleUploadImg(imgList).then(() => {
                            setTimeout(() => {
                                values = {
                                    ...values,
                                    category: {
                                        id: categories.find(e => e.name === values.category.name).id,
                                        name: values.category.name
                                    },
                                    images: imgUrl
                                }
                                dispatch(createProduct(values)).then(() => {
                                    setMsg("Done")
                                    setTimeout(() => {
                                        alert("Sucess")
                                        navigate("/admin/products")
                                    },1000)
                                })
                            },3000) 
                            // handleUploadImg sẽ chạy xong trước khi trả về url nên dùng setTimeout 32s để đợi
                        })
                    } else {
                        alert("An error occured about images")
                        return;
                    }
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
                    <input
                        type="file"
                        onChange={(e) => {
                            const listFile = Array.from(e.target.files).map(file => file)
                            imgList = [...listFile]
                        }}
                        multiple
                    />
                    <button type='submit'>Add</button>
                    <p className='msg'>{msg}</p>
                </Form>
            </Formik>
        </div>
    )
}

