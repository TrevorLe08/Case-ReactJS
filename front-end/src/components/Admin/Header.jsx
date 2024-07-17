import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div className='h-14 bg-white fixed z-nav top-0 w-4/5 flex justify-between shadow-2xl'>
            <div className='px-3 py-2 my-1.5 ml-3 w-80 border-[1px] border-black rounded-md'>
                <i className="bi bi-search mr-2 text-gray-500"></i>
                <input className='outline-none w-64' type="search" placeholder='Search...' />
            </div>
            <div className='p-1 mr-2' >
                <div className='font-medium text-xl pb-11 mx-3 inline cursor-default'>
                    <i className="bi bi-bell mr-4 cursor-pointer"></i>
                    {currentUser.name}
                </div>
                <i className="bi bi-person-circle text-3xl"></i>
            </div>
        </div>
    )
}
