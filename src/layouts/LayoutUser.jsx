import React from 'react'
import UserNav from '../components/user/UserNav'
import { Outlet } from 'react-router'

function LayoutUser() {
  return (
    <div className="flex flex-col  items-center min-h-screen bg-[url('../../public/login.jpg')] bg-cover bg-no-repeat">
        <UserNav/>
        <Outlet/>
    </div>
  )
}

export default LayoutUser