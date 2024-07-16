import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/slices/usersSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    return (
        <div>
            <h2 onClick={() => navigate("/admin")}>Admin here</h2>
            <button onClick={() => {
                dispatch(logOut())
                navigate("/")
            }}>Log out</button>
            <div className="header">
                <ul>
                    <li><Link to='/admin/products'>Product</Link></li>
                    <li><Link to='/admin/categories'>Category</Link></li>
                    <li><Link to='/admin/carts'>Cart</Link></li>
                </ul>
            </div>
        </div>
    )
}
