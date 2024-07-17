import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteProduct } from '../../../service/productService'
import { getCategory } from '../../../service/categoryService'
import { findCategory } from '../../../redux/slices/productsSlice'

export default function ListProduct() {
    const bestSeller = [
        {
            id: 1,
            name: 'Iphone 14 promax',
            price: 30000,
            quantity: 10,
            category: { id: 2, name: 'Điện tử' },
            images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826", "https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg", "https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
        },

        {
            id: 3,
            name: 'Vợt cầu lông Kumpoo',
            price: 500,
            quantity: 15,
            category: { id: 1, name: 'Thể thao' },
            images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826", "https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg", "https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
        },
        {
            id: 4,
            name: 'Giày thể thao Adidas',
            price: 5000,
            quantity: 15,
            category: { id: 1, name: 'Thể thao' },
            images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826", "https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg", "https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
        },

        {
            id: 7,
            name: 'Samsung S24 Ultra',
            price: 30000,
            quantity: 10,
            category: { id: 2, name: 'Điện tử' },
            images: ["https://img.freepik.com/premium-vector/shopping-cart-icon-line-art_965427-1573.jpg?w=826", "https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg", "https://th.bing.com/th/id/OIP.Wztce0r39NK_NXCCULfIUQHaHa?rs=1&pid=ImgDetMain"]
        }
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, searchCategory } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.category)

    // Products will change if category and search change
    const searchList = products.filter(item => {
        if (searchCategory === "All") {
            return item
        } else {
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
        <div className='m-2'>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-blue-500 font-medium mb-2 ml-1 cursor-default'># List products</p>
                <div onClick={() => navigate("/admin/products/add")}
                    className='btn-add-product'
                >Add products
                    <i className="bi bi-plus-square text-xl ml-2"></i>
                </div>
                <div className='mb-3'>
                    <label htmlFor="category" className='block outline-0 mb-2 text-base font-medium text-gray-900'>Category</label>
                    <select
                        id='category'
                        onChange={(e) => dispatch(findCategory(e.target.value))}
                        value={searchCategory}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5'
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
                {searchList.length > 0 ? (
                    <table className='products-table'>
                        <thead>
                            <tr>
                                <th className='products-table-th px-2'>#</th>
                                <th className='products-table-th'>Name</th>
                                <th className='products-table-th'>Price</th>
                                <th className='products-table-th'>Quantity</th>
                                <th className='products-table-th'>Image</th>
                                <th className='products-table-th'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchList.map((product, index) => (
                                <tr key={index} className='hover:bg-gray-200'>
                                    <td className='products-table-td'>{index + 1}</td>
                                    <td className='products-table-td'>{product.name}</td>
                                    <td className='products-table-td'>{product.price}k</td>
                                    <td className='products-table-td'>{product.quantity}</td>
                                    <td className='products-table-td'><img className='mx-auto' src={product.images[0]} width='50px' alt='demo products' /></td>
                                    <td className='products-table-td'>
                                        <button className='btn-delete-product' onClick={() => handleDelete(product.id)}><i className="bi bi-trash text-lg"></i></button>
                                        <button className='btn-detail-product' onClick={() => navigate(`/admin/products/detail/${product.id}`)}><i className="bi bi-eye-fill"></i></button>
                                        <button className='btn-edit-product' onClick={() => navigate(`/admin/products/edit/${product.id}`)}><i className="bi bi-pencil-fill"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <>
                        <p className='text-center text-2xl font-bold'>Nothing here ._.</p>
                    </>
                )}
            </div>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-red-500 font-medium mb-2 ml-1 cursor-default'># Best seller</p>
                <table className='products-table'>
                    <thead>
                        <tr>
                            <th className='products-table-th px-2'>#</th>
                            <th className='products-table-th'>Image</th>
                            <th className='products-table-th'>Name</th>
                            <th className='products-table-th'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSeller.map((item, index) => (
                            <tr key={index} className='hover:bg-gray-200'>
                                <td className='products-table-td text-xl'>{index + 1}</td>
                                <td className='products-table-td text-xl'><img className='mx-auto' src={item.images[0]} width='50px' alt='demo products' /></td>
                                <td className='products-table-td text-xl'>{item.name}</td>
                                <td className='products-table-td text-xl'>{item.price}k</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
