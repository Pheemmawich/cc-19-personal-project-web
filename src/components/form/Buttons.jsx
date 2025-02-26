import React from 'react'
import { Loader } from 'lucide-react';

function Buttons({isSubmitting, label}) {
  return (
    <button className="bg-yellow-400 font-bold px-2 py-1 rounded-md">
      {isSubmitting 
      ? <div className='flex gap-2'><Loader className='animate-spin'/><p>Loding...</p></div> 
      : <p>{label}</p> }
    </button>
  )
}

export default Buttons