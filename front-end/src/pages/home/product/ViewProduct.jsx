import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { readProduct } from '../../../service/productService'
import { getCarts, updateCart } from '../../../service/cartService'
import '../../../style/user/store/Product.css'

export default function UserDetailProduct() {
    let { id } = useParams()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { currentProduct } = useSelector(state => state.product)
    const [current, setCurrent] = useState(0)
    const { carts } = useSelector(state => state.cart)
    const { currentUser, isLogged } = useSelector(state => state.user)
    let yourCart = carts.find(cart => cart.user.username === currentUser.username)

    const handleAddProduct = (p) => {
        if (!isLogged) {
            alert("Đăng nhập để mua hàng")
            return;
        }
        const value = {
            id: p.id,
            name: p.name,
            quantity: 1,
            price: p.price,
        }
        const index = yourCart.products.findIndex(p => p.id === value.id)
        const listPro = [...yourCart.products]
        const element = { ...listPro[index] }

        // If product exists in cart, quantity will increase by 1
        // And product will add if it doesn't exist
        index >= 0 ? listPro[index] = { ...listPro[index], quantity: element.quantity += 1 } : listPro.push(value)

        // Calculate total and amount
        let newTotal = 0
        let newAmount = 0
        listPro.forEach(item => {
            newAmount += item.quantity
            newTotal += (item.price * item.quantity)
        })

        yourCart = {
            ...yourCart,
            total: newTotal,
            amount: newAmount,
            products: listPro
        }
        dispatch(updateCart(yourCart)).then(() => {
            alert("Success")
        })
    }

    const changeSlide = (action) => {
        console.log("hi");
        if (action === "previous") {
            if (current === 0) {
                setCurrent(currentProduct.images.length - 1)
            } else {
                setCurrent(current - 1)
            }
        } else {
            if (current === currentProduct.images.length - 1) {
                setCurrent(0)
            } else {
                setCurrent(current + 1)
            }
        }
    }

    useEffect(() => {
        const getData = () => {
            dispatch(readProduct(id))
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])

    return (
        <div>
            <button className='btn-card' onClick={() => navigate("/home/store")}>Trở về</button>
            <div className='md:flex md:justify-center mt-4'>
                <div className='mb-4 md:mb-0 md:mr-14'>
                    <div className="wrapper-img">
                        <div className='relative overflow-hidden'>
                            <div
                                className='flex transition duration-700 ease-in-out'
                                style={{
                                    transform: `translateX(-${current * 100}%)`
                                }}
                            >
                                {currentProduct.images.map((url, index) => (
                                    <img key={index} src={url} alt="Products" className='rounded-xl ' />
                                ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-slider group start-0"
                            onClick={() => changeSlide("previous")}
                        >
                            <span className="icon-btn-slider">
                                <i className="bi bi-caret-left-fill text-2xl text-black"></i>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn-slider group end-0"
                            onClick={() => changeSlide("next")}
                        >
                            <span className="icon-btn-slider">
                                <i className="bi bi-caret-right-fill text-2xl text-black"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <div className='w-full md:w-[500px] pl-14 md:border-l-2 md:border-l-gray-500'>
                    <p className='text-xl font-medium'>{currentProduct.name}</p>
                    <p className='text-3xl font-medium'>{currentProduct.price}.000 VND</p>
                    <p className='text-base font-medium'>Mô tả:</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sed fuga rem ex. Aut vel iste, labore eaque aperiam tempora aliquam vero quae odit? Praesentium est rem expedita maxime perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus temporibus saepe a ipsa quibusdam dolor laborum explicabo deserunt fugit, eveniet, rerum quidem. Impedit voluptatum nulla doloremque voluptate obcaecati quia officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita nam explicabo. Ad, itaque voluptatum! Alias, corrupti id molestiae impedit neque reprehenderit assumenda tempore velit eveniet distinctio corporis temporibus asperiores.</p>
                    <button className='btn-card mt-2' onClick={() => handleAddProduct(currentProduct)}>Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    )
}
