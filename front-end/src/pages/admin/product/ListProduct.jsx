import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteProduct } from '../../../service/productService'
import { getCategory } from '../../../service/categoryService'
import { findCategory, findSearch } from '../../../redux/slices/productsSlice'

export default function ListProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, searchName, searchCategory } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)

    // Products will change if category and search change
    const searchList = products.filter(item => {
        if (searchCategory === "All") {
            if (searchName !== "") return item.name.toLowerCase().includes(searchName.toLowerCase())
            return item
        } else {
            if (searchName !== "") return item.category.name === searchCategory && item.name.toLowerCase().includes(searchName.toLowerCase())
            return item.category.name === searchCategory
        }
    })

    const handleDelete = (id) => {
        dispatch(deleteProduct(id)).then(() => {
            alert("Xóa thành công")
            window.location.reload()
        })
    }
    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(getCategory())
        }
        getData()
    }, [dispatch])

    return (
        <div>
            <h2>List Product</h2>
            <button onClick={() => navigate("/admin/products/add")}>Add</button>
            <br /><br />
            <div>
                Search:
                <input
                    type="search"
                    placeholder='Search name...'
                    onChange={(e) => dispatch(findSearch(e.target.value))}
                />
                <select
                    onChange={(e) => dispatch(findCategory(e.target.value))}
                    value={searchCategory}
                >
                    <option value="All">Tất cả</option>
                    {categories.map((category, index) => (
                        <option
                            value={category.name}
                            key={index}
                        >{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                {searchList.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Hình ảnh</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchList.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}k</td>
                                    <td>{product.quantity}</td>
                                    <td><img src={product.images[0]} width='50px' alt='demo products' /></td>
                                    <td>
                                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                                        <button onClick={() => navigate(`/admin/products/detail/${product.id}`)}>Detail</button>
                                        <button onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <>
                        <h2 style={{ textAlign: 'center' }}>Nothing here ._.</h2>
                    </>
                )}
            </div>
        </div>
    )
}
