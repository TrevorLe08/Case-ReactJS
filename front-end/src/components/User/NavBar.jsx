import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { logOut } from '../../redux/slices/usersSlice';
import './NavBar.css'
import { getCarts } from '../../service/cartService';

export default function NavBar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { currentUser, isLogged } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.cart)
    const yourCart = carts.find(cart => cart.user.username === currentUser.username)
    const navList = [
        {
            label: 'Home',
            link: '/home/us'
        }, {
            label: <i className="bi bi-shop"></i>,
            link: '/home/products'
        }, {
            label: 
            (<>
                <i className="bi bi-cart"></i>
                <span className='amount-cart'>{yourCart.amount}</span>
            </>),
            link: '/home/your-cart'
        }, {
            label: 'About',
            link: '/home/about'
        }
    ]

    useEffect(() => {
        const getData = () => {
            dispatch(getCarts())
        }
        getData()
    }, [dispatch])
    return (
        <div className='wrapper-nav'>
            {!isLogged ? (
                <div>
                    <button className='user-btn-login' onClick={() => navigate("/")}>Log in</button>
                    <button className='user-btn-login' onClick={() => navigate("/register")}>Register</button>
                </div>
            ) : (
                <div className='user-group'>
                    <h2 className='user-info'><i className="bi bi-person-circle"></i> : {currentUser.name}</h2>
                    <div>
                        <button className='user-btn-logout' onClick={() => dispatch(logOut())}>Log out</button>
                    </div>
                </div>
            )}
            <nav>
                <ul className='nav-list'>
                    {navList.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.link}
                                className='nav-item'
                                style={({ isActive }) => isActive ? { color: '#fff', background: '#008CBA' } : { color: 'black', background: '#E8E8E8' }}
                            ><span className='size-20'>{item.label}</span></NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
