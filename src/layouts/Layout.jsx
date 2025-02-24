import React from 'react'
import { Outlet } from 'react-router'
import MainNav from '../components/MainNav'

function Layout() {
  return (
    <div className='container'>
        <MainNav/>
        <Outlet/>
    </div>
  )
}

export default Layout