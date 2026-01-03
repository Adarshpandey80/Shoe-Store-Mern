import React from 'react'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
      <div className="min-h-screen bg-gray-100">
      <main className="p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout