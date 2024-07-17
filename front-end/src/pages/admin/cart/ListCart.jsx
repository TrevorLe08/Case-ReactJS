import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts } from '../../../service/cartService'

export default function ListCart() {
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)

    useEffect(() => {
        const getData = () => dispatch(getCarts())
        getData()
    }, [dispatch])
    return (
        <div className='m-2'>
            <div className='bg-white p-4 mt-[10px] rounded-md'>
                <p className='text-lg font-medium text-primary'># List Cart</p>
                <table className='cart-table'>
                    <thead>
                        <tr>
                            <th className='cart-th'>#</th>
                            <th className='cart-th'>User</th>
                            <th className='cart-th'>Total</th>
                            <th className='cart-th'>Amount</th>
                            <th className='cart-th'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, index) => (
                            <tr key={index}>
                                <td className='cart-td'>{index + 1}</td>
                                <td className='cart-td'>{cart.user.name}</td>
                                <td className='cart-td'>{cart.total}k</td>
                                <td className='cart-td'>{cart.amount}</td>
                                <td className='cart-td'>{cart.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
