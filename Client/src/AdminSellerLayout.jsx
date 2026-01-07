import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminSeller/AdminNavbar'

function AdminSellerLayout() {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    
    </>
  )
}

export default AdminSellerLayout