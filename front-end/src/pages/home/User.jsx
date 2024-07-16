import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/User/NavBar';

export default function User() {

    return (
        <>
            {/* NavBar User */}
            <NavBar />
            <div className='outlet'>
                <Outlet />
            </div>
        </>
    )
}
