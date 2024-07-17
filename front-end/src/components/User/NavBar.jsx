import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { logOut } from '../../redux/slices/usersSlice';
import { getCarts } from '../../service/cartService';
import '../../style/user/navbar/NavBar.css'

export default function NavBar() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { currentUser, isLogged } = useSelector(state => state.user)
    const { carts } = useSelector(state => state.cart)
    const yourCart = carts.find(cart => cart.user.username === currentUser.username)
    const navList = [
        {
            label: (
                <>
                    <span className='mr-2'>Home</span>
                    <i class="bi bi-house-door"></i>
                </>
            ),
            link: '/home/us'
        }, {
            label: (
                <>
                    <span className='mr-2'>Store</span>
                    <i className="bi bi-shop"></i>
                </>
            ),
            link: '/home/store'
        }, {
            label:
                (<>
                    <span className='mr-2'>Cart</span>
                    <i className="bi bi-cart"></i>
                    <span className='amount-cart'>{isLogged && yourCart.amount}</span>
                </>),
            link: '/home/your-cart'
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
                <div className='flex text-center'>
                    <h2 className='user-info'>
                        <i className="bi bi-person-circle" />
                        {currentUser.name}
                    </h2>
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
                                style={({ isActive }) => isActive ? { background: '#008CBA' } : { background: 'transparent' }}
                            ><span className='size-20'>{item.label}</span></NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
