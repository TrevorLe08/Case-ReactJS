import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../../service/categoryService'
import { createProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { imageStorage } from '../../../firebase.config'

export default function AddProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)
    const [msg, setMsg] = useState("Click to upload images")
    const [status, setStatus] = useState("")
    const [isUpload, setIsUpload] = useState(false)
    let imgList = []
    let [imgUrl,setImgUrl] = useState([])

    const handleUploadImg = (list) => {
        list.forEach(img => {
            const imgRef = ref(imageStorage, `images/${img.name + v4()}`)
            uploadBytes(imgRef, img).then((value) => {
                getDownloadURL(value.ref).then((url) => {
                    setImgUrl(data => [...data,url])
                    imgList = [...imgUrl,url]
                })
            })
        })
    }
    useEffect(() => {
        const getData = () => dispatch(getCategory())
        getData()
    }, [dispatch])
    return (
        <div>
            <button className='btn-back mx-2 bg-transparent' onClick={() => navigate("/admin/products")}>
                <i className="bi bi-arrow-return-left mr-2"></i>
                <span>Back</span>
            </button>
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
                        setStatus("Loading...")
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
                                setStatus("Done ✔")
                                setTimeout(() => {
                                    alert("Adding successfully")
                                    navigate("/admin/products")
                                }, 1000)
                            })
                        }, 3000)
                        // handleUploadImg sẽ chạy xong trước khi trả về url nên dùng setTimeout 32s để đợi

                    } else {
                        setStatus("Failed ✖")
                        alert("An error occured about images")
                        return;
                    }
                }}
            >
                <div className='wrapper'>
                    <Form className='form-product'>
                        <p className='text-2xl font-medium text-center'>Add Product</p>
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
                        <div className="flex items-center justify-center w-full mb-4">
                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2  ${isUpload ? "border-green-500" : "border-gray-300"} border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <i className={`bi ${isUpload ? 'bi-cloud-check text-green-500' : 'bi-cloud-upload text-gray-500'} w-8 h-8 mb-4 text-5xl`}></i>
                                    <p className={`font-medium ${isUpload ? "text-green-500" : "text-gray-500"} mb-2 text-lg`}>
                                        {msg}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className=""
                                    onChange={(e) => {
                                        const listFile = Array.from(e.target.files).map(file => file)
                                        handleUploadImg(listFile)
                                        setMsg("File is ready")
                                        setIsUpload(true)
                                    }}
                                    multiple
                                />
                            </label>
                        </div>
                        <button className='btn-submit' type='submit'>Add</button>
                        <p className={`font-medium text-lg text-center ${status === "Loading..." ? 'text-yellow-600' : (status === "Done ✔" ? 'text-green-500' : 'text-red-600')}`}>{status}</p>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}

