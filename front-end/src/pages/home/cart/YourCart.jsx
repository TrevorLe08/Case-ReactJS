import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts, updateCart } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import '../../../style/user/your-cart/Cart.css'

export default function YourCart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)
    const { products } = useSelector(state => state.product)
    const { currentUser, isLogged } = useSelector(state => state.user)
    let yourCart = carts.find(item => item.user.username === currentUser.username)

    const handleRemove = (p, dispatch) => {
        // Return new list products
        const listPro = yourCart.products.filter(item => item.id !== p.id)

        // Calculate total and amount
        let newTotal = 0
        let newAmount = 0
        listPro.forEach(item => {
            newTotal += (item.price * item.quantity)
            newAmount += item.quantity
        })

        // Update your cart
        yourCart = {
            ...yourCart,
            total: newTotal,
            amount: newAmount,
            products: listPro,
        }
        dispatch(updateCart(yourCart)).then(() => {
            alert("Xóa thành công")
        })
    }

    const handleChange = (p, action) => {
        const listPro = [...yourCart.products]
        const index = listPro.findIndex(item => item.id === p.id)
        const temp = products.find(product => product.id === p.id)
        const element = { ...listPro[index] }

        // Quantity must be greater than 0 and less than product's quantity
        if (listPro[index].quantity === 1 && action === "decrease") {
            alert("Không thể bớt được");
            return;
        } else if ((temp.quantity === listPro[index].quantity) && action === "increase") {
            alert("Không thể mua thêm");
            return;
        }

        // Check action
        if (action === "increase") {
            listPro[index] = { ...element, quantity: element.quantity += 1 }
        } else if (action === "decrease") {
            listPro[index] = { ...element, quantity: element.quantity -= 1 }
        }

        // Calculate total and amount
        let newTotal = 0
        let newAmount = 0
        listPro.forEach(item => {
            newAmount += item.quantity
            newTotal += (item.price * item.quantity)
        })

        // Update your cart
        yourCart = {
            ...yourCart,
            total: newTotal,
            amount: newAmount,
            products: listPro
        }
        dispatch(updateCart(yourCart))
    }

    const handleRemoveAll = () => {
        yourCart = {
            ...yourCart,
            total: 0,
            amount: 0,
            products: []
        }
        dispatch(updateCart(yourCart)).then(() => alert("Xóa hết thành công"))
    }

    useEffect(() => {
        const getData = () => {
            dispatch(getProduct())
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])
    return (
        <>
            {!isLogged ? <h2 className='text-center font-bold text-2xl'>Đăng nhập để mua hàng nhá bạn :v </h2>
                : (
                    <>
                        {currentUser.isAdmin ? <h2 className='text-center font-bold text-2xl'>Admin không tự mua hàng nha ní:v</h2>
                            : (
                                <>
                                    {yourCart.products.length === 0 ? (
                                        <div className='text-center font-bold text-2xl'>
                                            <h2>Giỏ hàng hiện đang trống</h2>
                                            <p className='cursor-pointer text-base font-medium' onClick={() => navigate("/home/store")}>🡠 Bắt đầu mua sắm</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <h2 className='text-xl font-medium'>Giỏ hàng của {yourCart.user.name}</h2>
                                                <h2 className='text-xl font-medium'>Sản phẩm đã thêm: </h2>
                                                <table className='cart-table'>
                                                    <thead>
                                                        <tr>
                                                            <th className='cart-table-th'>STT</th>
                                                            <th scope='col' className='cart-table-th'>Tên</th>
                                                            <th scope='col' className='cart-table-th'>Giá</th>
                                                            <th scope='col' className='cart-table-th'>Số lượng</th>
                                                            <th scope='col' className='cart-table-th'>Tổng</th>
                                                            <th scope='col' className='cart-table-th text-end'>Xóa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {yourCart.products.map((product, index) => (
                                                            <tr className='odd:bg-white even:bg-gray-100 hover:bg-gray-100'>
                                                                <td className='cart-table-td font-medium'>{index + 1}</td>
                                                                <td className='cart-table-td'>{product.name}</td>
                                                                <td className='cart-table-td'>{product.price}k</td>
                                                                <td className='cart-table-td flex justify-start'>
                                                                    <div className='border-[0.5px] border-gray-500 rounded w-[100px] flex justify-center items-center'>
                                                                        <button
                                                                            className='text-lg cursor-pointer font-medium'
                                                                            onClick={() => handleChange(product, 'decrease')}
                                                                        >-</button>
                                                                        <span className='px-3'>{product.quantity}</span>
                                                                        <button
                                                                            className='text-lg cursor-pointer font-medium'
                                                                            onClick={() => handleChange(product, 'increase')}
                                                                        >+</button>
                                                                    </div>
                                                                </td>
                                                                <td className='cart-table-td'>{product.quantity * product.price}k</td>
                                                                <td className='cart-table-td text-end'>
                                                                    <button
                                                                        className='px-2 py-1 bg-white border-2 border-red-600 rounded transition duration-300 ease-in-out hover:bg-red-600'
                                                                        onClick={() => handleRemove(product, dispatch)}
                                                                    >
                                                                        <i className="bi bi-trash text-red-600 transition duration-300 ease-in-out hover:text-white"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className="flex justify-between mt-2" >
                                                    <div>
                                                        <button
                                                            className='px-3 py-2 bg-white border-2 border-red-600 text-red-600 font-medium rounded transition duration-300 ease-in-out hover:bg-red-600 hover:text-white'
                                                            onClick={handleRemoveAll}
                                                        >Xóa tất cả sản phẩm</button>
                                                    </div>
                                                    <div>
                                                        <p className='text-xl font-medium'>Tổng tiền: {yourCart.total}.000 VND</p>
                                                        <p className='text-xl font-medium'>Tổng số lượng: {yourCart.amount}</p>
                                                        <button className='px-3 py-2 bg-primary text-white rounded my-2'>Thanh toán</button>
                                                        <p className='cursor-pointer' onClick={() => navigate("/home/store")}>🡠 Tiếp tục mua hàng</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                    </>
                )}
        </>
    )
}
