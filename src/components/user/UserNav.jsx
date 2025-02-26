import { SquareUserRound } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import Logout from '../Logout'

function UserNav() {

  return (
    <nav
        className = 'flex justify-between bg-yellow-200 text green-900 font-bold px-8 py-2 my-2 rounded-md shadow-md'
    >
        <div className="flex gap-4">
            <Link to = '/user'>Logo</Link>
            <Link to = '/user'>Home</Link>
            
        </div>
        <div className="flex gap-4">
            <Link to = '/user/profile'><SquareUserRound/></Link>  
            <Logout/>
        </div>
    </nav>
  )
}

export default UserNav