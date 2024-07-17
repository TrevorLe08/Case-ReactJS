import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../service/productService'
import '../../style/admin/home/Home.css'
import { getCarts } from '../../service/cartService';

export default function HomeAdmin() {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.product)
  const { carts } = useSelector(state => state.cart)
  let totalProducts = 0
  let totalEarning = 0
  let totalAmount = 0
  let totalUser = 0

  products.forEach(item => totalProducts += item.quantity)
  carts.forEach(item => {
    totalEarning += item.total
    totalAmount += item.amount
    totalUser += 1
  })

  useEffect(() => {
    const getData = () => {
      dispatch(getProduct())
      dispatch(getCarts())
    }
    getData()
  }, [dispatch])
  return (
    <div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 m-4'>
        <div className="card-dashboard border-l-primary mt-2">
          <div>
            <p className='text-base font-medium text-primary'>Total Products:</p>
            <p className='text-2xl font-medium text-gray-500'>{totalProducts} products</p>
          </div>
          <i className="bi bi-box2-fill text-3xl text-primary"></i>
        </div>

        <div className="card-dashboard border-l-green-500 mt-2">
          <div>
            <p className='text-base font-medium text-green-500'>Total Earnings:</p>
            <p className='text-2xl font-medium text-gray-500'>{totalEarning}.000 VNĐ</p>
          </div>
          <i className="bi bi-currency-dollar text-3xl text-green-400"></i>
        </div>
        <div className="card-dashboard border-l-yellow-500 mt-2">
          <div>
            <p className='text-base font-medium text-yellow-500'>Products sold:</p>
            <p className='text-2xl font-medium text-gray-500'>{totalAmount} products</p>
          </div>
          <i class="bi bi-cart-check text-3xl text-yellow-400"></i>
        </div>
        <div className="card-dashboard border-l-tertiary mt-2">
          <div>
            <p className='text-base font-medium text-tertiary'>Total Custom:</p>
            <p className='text-2xl font-medium text-gray-500'>{totalUser} users</p>
          </div>
          <i class="bi bi-people-fill text-3xl text-tertiary"></i>
        </div>
      </div>
      <p className='text-center font-bold text-2xl'>Page Admin</p>
    </div>
  )
}

