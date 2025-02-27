import { SignedIn, SignedOut,  SignInButton, SignOutButton } from '@clerk/clerk-react'
import Signout from './user/Signout'
import React, { useState } from 'react'
import { Link } from 'react-router'

function MainNav() {

  return (
    <nav
        className = 'flex justify-between bg-yellow-200 text green-900 font-bold px-8 py-2 my-2 rounded-md shadow-md'
    >
        <div className="flex gap-4">
            <Link to = '/'>Logo</Link>
            <Link to = '/'>Home</Link>
            
        </div>
        <div className="flex gap-4">
            <Link to = '/register'>Register</Link>  
            <Link to = '/login'>Login</Link>

        {/* <div className='bg-white relative group'>
          <SignedOut>
            <SignInButton mode='modal'>
                <span>Sign in</span>
            </SignInButton>
          </SignedOut>

          <SignedIn>
                <span >Hello User</span>
          </SignedIn>
          <Signout/>         
        </div> */}

        </div>
    </nav>
  )
}

export default MainNav