import { SignedIn, SignOutButton } from '@clerk/clerk-react'
import { Link } from 'react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router'

function Signout() {

const navigate = useNavigate()

const hdlClickProfile = () => {
    navigate('/user/profile')
}


  return (
    <SignedIn>
            <ul className='hidden group-hover:block top-6 bg-blue-500 absolute'>
                <button onClick={hdlClickProfile}>Profile</button>
                <SignOutButton>
                    <li>Signout</li>
                </SignOutButton>
            </ul>
    </SignedIn>
    
  )
}

export default Signout