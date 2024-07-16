import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../service/productService'

export default function DetailProduct() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let {id} = useParams()
    const {currentProduct} = useSelector(state => state.product)
    const nameCategory = currentProduct.category.name 

    useEffect(() => {
        const getData = () => dispatch(readProduct(id))
        getData()
    },[])
    return (
        <div>
            <br />
            <button onClick={() => navigate("/admin/products")}>Back</button>
            <h2>Detail product {id}</h2>
            <h2>{currentProduct.id}</h2>
            <h2>{currentProduct.name}</h2>
            <h2>{currentProduct.price}</h2>
            <h2>{currentProduct.quantity}</h2>
            <h2>{nameCategory}</h2>
            <h2><img src={currentProduct.images[0]} alt="demo product" width='200px'/></h2>
        </div>
    )
}
