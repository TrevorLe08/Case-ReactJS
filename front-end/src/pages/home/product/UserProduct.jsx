import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../../service/productService'
import { getCarts, updateCart } from '../../../service/cartService'
import { useNavigate } from 'react-router-dom'
import HeaderSearch from '../../../components/User/HeaderSearch'
import './Product.css'

export default function UserProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products, searchName, searchCategory } = useSelector(state => state.product)
  const { carts } = useSelector(state => state.cart)
  const { currentUser, isLogged } = useSelector(state => state.user)
  const searchList = products.filter(item => {
    if (searchCategory === "All") {
      if (searchName !== "") return item.name.toLowerCase().includes(searchName.toLowerCase())
      return item
    } else {
      if (searchName !== "") return item.category.name === searchCategory && item.name.toLowerCase().includes(searchName.toLowerCase())
      return item.category.name === searchCategory
    }
  })
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

  useEffect(() => {
    const getData = () => {
      dispatch(getProduct())
      dispatch(getCarts())
    }
    getData()
  }, [dispatch])

  return (
    <div>
      {isLogged && <h3>Số lượng sản phẩm trong giỏ hàng: {yourCart.amount}</h3>}
      <HeaderSearch />
      <div className='wrapper'>
          {searchList.map((product) => (
            <div className='card' key={product.id}>
              <img className="image" src={product.images[0]} alt="Demo product" />
              <h2>{product.name}</h2>
              <h2>{product.price}.000 VNĐ</h2>
              <button className="btn-card" onClick={() => handleAddProduct(product)}>Add to cart</button>
              <button className="btn-card" onClick={() => navigate(`/home/products/detail/${product.id}`)}>View</button>
            </div>
          ))}
      </div>
    </div>
  )
}
