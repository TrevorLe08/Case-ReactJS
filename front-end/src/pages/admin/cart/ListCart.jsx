import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarts } from '../../../service/cartService'

export default function ListCart() {
    const dispatch = useDispatch()
    const { carts } = useSelector(state => state.cart)

    useEffect(() => {
        const getData = () => dispatch(getCarts())
        getData()
    }, [])
    return (
        <div>
            <h2>List Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Thời gian</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((cart, index) => {
                        // As some unknown reason , cart.user is undefined before render
                        const { name } = cart.user
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{name}</td>
                                <td>{cart.total}k</td>
                                <td>{cart.date}</td>
                                <td><button>Detail</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
