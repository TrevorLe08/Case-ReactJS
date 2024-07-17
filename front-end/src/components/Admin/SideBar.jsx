import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/slices/usersSlice'
import { Link, useNavigate } from 'react-router-dom'
import '../../style/admin/sidebar/SideBar.css'

export default function NavBar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    return (
        <>
            <div className='mb-3'>
                <p className='text-center text-white font-bold font-barlow text-2xl mt-2'
                >Admin here</p>
            </div>
            <hr className='w-auto mx-2 border-gray-500' />
            <nav className="sidebar-list">
                <div className='sidebar-item hover:text-tertiary'>
                    <Link to='/admin'>
                        <i className="bi bi-house-door mr-2"></i>Home
                    </Link>
                </div>
                <div className='sidebar-item hover:text-tertiary'>
                    <Link to='/admin/products'>
                        <i className="bi bi-shop-window mr-2"></i>Product
                    </Link>
                </div>
                <div className='sidebar-item hover:text-tertiary'>
                    <Link to='/admin/categories'>
                        <i className="bi bi-card-list mr-2"></i>Category
                    </Link>
                </div>
                <div className='sidebar-item hover:text-tertiary'>
                    <Link to='/admin/carts'>
                        <i className="bi bi-cart-fill mr-2"></i>Cart
                    </Link>
                </div>
                <hr className='w-auto mx-2 border-gray-500' />
                <div className='sidebar-item mb-0 hover:text-tertiary'>
                    <div onClick={() => alert("Coming soon:)")}>
                        <i className="bi bi-gear mr-2"></i>Setting
                    </div>
                </div>
                <div
                    className='sidebar-item hover:text-red-600'
                    onClick={() => {
                        if (window.confirm("Are you sure to sign out?")) {
                            dispatch(logOut())
                            navigate("/")
                        }
                    }}
                >
                    <i className="bi bi-box-arrow-left mr-2"></i>
                    Log out
                </div>
            </nav>


        </>
    )
}
