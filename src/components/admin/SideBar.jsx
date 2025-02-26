import { LayoutDashboard, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { sidebarLink } from '../../utils/links'

function SideBar() {
  return (
    <div className='bg-yellow-300 w-48 text-white'>
        {/* Profile */}
        <div className='flex flex-col items-center my-12 gap-2'>
            <User size={48}/>
            <p>Profile</p>
        </div>

        {/* Navlinks */}
        {
            sidebarLink.map((item) => {
                const {label, link, icon} = item
                return (
                <div key = {label}>
                    <Link to = {link} className = 'flex gap-2 px-4 py-2 hover:bg-yellow-200 hover:duration-500'>
                        {icon}
                        <p>{label}</p>
                    </Link>
                </div>
                )
            })
        }
        

    </div>
  )
}

export default SideBar