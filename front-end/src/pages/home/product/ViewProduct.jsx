import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../service/productService'
import './Product.css'

export default function UserDetailProduct() {
    let { id } = useParams()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { currentProduct } = useSelector(state => state.product)
    const product = { ...currentProduct }
    const [query, setQuery] = useState(0)

    useEffect(() => {
        const getData = () => dispatch(readProduct(id))
        getData()
    }, [dispatch,id])

    return (
        <>  
            <br />
            <button onClick={() => navigate("/home/products")}>Back</button>
            <div>
                <h2>Tên: {product.name}</h2>
                <h2>Giá: {product.price}.000 VND</h2>
                <h2>Số lượng: {product.quantity}</h2>
                <h2>Thể loại: {product.category.name}</h2>
                <h2>Hình ảnh:</h2>
            </div>
            <div className='slider'>
                <button
                    className='nav-btn'
                    onClick={() => {
                        setQuery(prev => prev === 0 ? prev : prev -= 1)
                    }}
                >🡠</button>
                <div>
                    <img
                        className='image'
                        src={product.images[query]}
                        alt="demo product"
                    />
                </div>
                <button
                    className='nav-btn'
                    onClick={() => {
                        setQuery(prev => prev === (product.images.length - 1) ? prev : prev += 1)
                    }}
                >🡢</button>
            </div>
        </>
    )
}
