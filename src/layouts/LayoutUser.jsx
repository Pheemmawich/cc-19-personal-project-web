import React from 'react'
import UserNav from '../components/user/UserNav'
import { Outlet } from 'react-router'

function LayoutUser() {
  return (
    <div className='container'>
        <UserNav/>
        <Outlet/>
    </div>
  )
}

export default LayoutUser