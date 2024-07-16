import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readCategory } from '../../../service/categoryService'
import { getProduct } from '../../../service/productService'

export default function DetailCategory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentCategory } = useSelector(state => state.category)
    const { products } = useSelector(state => state.product)

    // Products change relying on name category
    const listProduct = products.filter(item => item.category.name === currentCategory.name)
    
    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(readCategory(id))
        }
        getData()
    }, [])
    return (
        <div>
            <h2>Detail category {id}</h2>
            <button onClick={() => navigate("/admin/categories")}>Back</button>
            <div>
                <h2>ID: {currentCategory.id}</h2>
                <h2>Name: {currentCategory.name}</h2>
                <h2>Product:</h2>
                {listProduct.length == 0 ? (<h2>Nothing here ...:(</h2>) : (
                    <>
                        {listProduct.map((item, index) => (
                            <h2>{index + 1}. {item.name}</h2>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
