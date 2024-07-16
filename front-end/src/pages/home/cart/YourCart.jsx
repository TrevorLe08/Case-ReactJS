import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts, updateCart } from '../../../service/cartService'
import { getProduct } from '../../../service/productService'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

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
            {!isLogged ? <h2 className='text-center'>Đăng nhập để mua hàng nhá bạn :v </h2>
                : (
                    <Fragment>
                        {currentUser.isAdmin ? <h2 className='text-center'>Admin không tự mua hàng nha ní:v</h2>
                            : (
                                <Fragment>
                                    {yourCart.products.length === 0 ? (
                                        <div className='text-center'>
                                            <h2>Giỏ hàng hiện đang trống</h2>
                                            <p className='pointer' onClick={() => navigate("/home/products")}>🡠 Bắt đầu mua sắm</p>
                                        </div>
                                    ) : (
                                        <Fragment>
                                            <div>
                                                <h2>Giỏ hàng của {yourCart.user.name}</h2>
                                                <h2>Sản phẩm đã thêm: </h2>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th className='cart-table'>STT</th>
                                                            <th className='cart-table'>Tên</th>
                                                            <th className='cart-table'>Giá</th>
                                                            <th className='cart-table'>Số lượng</th>
                                                            <th className='cart-table'>Tổng</th>
                                                            <th className='cart-table'>Xóa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {yourCart.products.map((product, index) => (
                                                            <tr>
                                                                <td className='cart-table'>{index + 1}</td>
                                                                <td className='cart-table'>{product.name}</td>
                                                                <td className='cart-table'>{product.price}k</td>
                                                                <td className='cart-table cart-quantity flex justify-content-start'>
                                                                    <div>
                                                                        <button onClick={() => handleChange(product, 'decrease')}>-</button>
                                                                        <span>{product.quantity}</span>
                                                                        <button onClick={() => handleChange(product, 'increase')}>+</button>
                                                                    </div>
                                                                </td>
                                                                <td className='cart-table'>{product.quantity * product.price}k</td>
                                                                <td className='cart-table'>
                                                                    <button
                                                                        className='cart-btn-remove'
                                                                        onClick={() => handleRemove(product, dispatch)}
                                                                    >
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className="flex justify-content-between" >
                                                    <div>
                                                        <button className='mt cart-btn-clear' onClick={handleRemoveAll} >Xóa tất cả sản phẩm</button>
                                                    </div>
                                                    <div>
                                                        <h2>Tổng tiền: {yourCart.total}.000 VND</h2>
                                                        <h2>Tổng số lượng: {yourCart.amount}</h2>
                                                        <button>Thanh toán</button>
                                                        <p className='pointer' onClick={() => navigate("/home/products")}>🡠 Tiếp tục mua hàng</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </Fragment>
                            )}
                    </Fragment>
                )}
        </>
    )
}
