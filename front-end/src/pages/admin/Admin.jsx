import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/Admin/NavBar'

export default function Admin() {
  return (
    <>
      <NavBar />
      <Outlet/>
    </>
  )
}
