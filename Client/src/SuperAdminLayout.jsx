import React from 'react'
import { Outlet } from 'react-router-dom'
import SupNavbar from './SuperAdmin/SupNavbar'


function SuperAdminLayout() {
  return (
   <>
   <SupNavbar/>

   <Outlet/>
   </>
  )
}

export default SuperAdminLayout