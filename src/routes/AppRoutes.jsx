import React from 'react'
import About from '../pages/About'
import Home from '../pages/Home'
import HomeUser from '../pages/user/HomeUser'
import MapUser from '../pages/user/MapUser'
import Manage from '../pages/admin/Manage'
import Dashboard from '../pages/admin/Dashboard'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import LayoutAdmin from '../layouts/LayoutAdmin'
import NotFound from '../pages/NotFound'
import { Route, Routes } from 'react-router'
import Layout from '../layouts/Layout'

function AppRoutes() {
  return (
    <>
        <Routes>
            {/* Public */}
            <Route path = "/" element={<Layout />}>
                <Route index element = {<Home/>} />
                <Route path = "about" element = {<About/>} />
                <Route path = "register" element = {<Register/>} />
                <Route path = "login" element = {<Login />} />
            </Route>

            {/* Private */}
            <Route path = "/" element={<Layout/>}>
                <Route path="/user/home" element={<HomeUser/>} />
                <Route path="/user/map" element={<MapUser />} />
            </Route>
            
            <Route path = "/" element={<LayoutAdmin/>}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/manage" element={<Manage />} />
            </Route>

            <Route path = "*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default AppRoutes