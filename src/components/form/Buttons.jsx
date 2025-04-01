import React from 'react'
import { Loader } from 'lucide-react';

function Buttons({isSubmitting, label}) {
  return (
    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 hover:cursor-pointer">
      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {isSubmitting 
        ? <div className='flex gap-2'><Loader className='animate-spin'/><p>Loding...</p></div> 
        : <p >{label}</p> }
      </span>
    </button>

    // <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
    //   <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
    //   {isSubmitting 
    //   ? <div className='flex gap-2'><Loader className='animate-spin'/><p>Loding...</p></div> 
    //   : <p>{label}</p> }
    //   </span>
    // </button>

    // <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    //   <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
    //   {isSubmitting 
    //   ? <div className='flex gap-2'><Loader className='animate-spin'/><p>Loding...</p></div> 
    //   : <p>{label}</p> }
    //   </span>
    // </button>
  )
    // <button className="btn-outline w-[140px] h- bg-opacity-0 font-bold px-2 py-1 rounded-md border">
    //   {isSubmitting 
    //   ? <div className='flex gap-2'><Loader className='animate-spin'/><p>Loding...</p></div> 
    //   : <p>{label}</p> }
    // </button>
}

export default Buttons