import React from 'react'
import useAuthStore from '../stores/auth-store'
import { Navigate, useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'


function Logout() {
    //JS
    const actionLogout = useAuthStore((state) => state.actionLogout)
    const navigate = useNavigate()

    const hdlLogout = () => {
        //code body
        actionLogout()
        console.log("Hello, Logout");
        navigate('/')
    }

  return (
    <div className='flex gap-2 hover:cursor-pointer' onClick={hdlLogout}>
            Logout
            <LogOut />
    </div>
  )
}

export default Logout