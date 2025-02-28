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
import Register1 from '../pages/auth/Register1'
import ProtectRoutes from './ProtectRoutes'
import LoginClerk from '../pages/auth/LoginClerk'
import Profile from '../pages/user/Profile'
import LayoutUser from '../layouts/LayoutUser'
import CreateRecipe from '../components/recipe/createRecipe'
import RecipeData from '../components/recipe/RecipeData'

function AppRoutes() {
  return (
    <>
        <Routes>
            {/* Public */}
            <Route path = "/" element={<Layout />}>
                <Route index element = {<Home/>} />
                <Route path = "about" element = {<About/>} />
                <Route path = "register" element = {<Register1/>} />
                <Route path = "login" element = {<Login/>} />
            </Route>

            {/* Private */}
            <Route path = "/user" element={<ProtectRoutes layout = {<LayoutUser/>} allows={["USER"]}/>}>
                <Route index element={<HomeUser/>} />
                <Route path="map" element={<MapUser />} />
                <Route path="profile" element={<Profile />} />
                <Route path="create-recipe" element={<CreateRecipe />} />
                <Route path="recipe-data/:id" element={<RecipeData />} />
            </Route>
            
            <Route path = "/admin" element={<ProtectRoutes layout = {<LayoutAdmin/>} allows={["ADMIN"]}/>}>
                <Route index element={<Dashboard />} />
                <Route path="manage" element={<Manage />} />
            </Route>

            <Route path = "*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default AppRoutes