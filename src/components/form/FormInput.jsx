import React from 'react'

function FormInput({register, name, type = 'text', errors, placeholder}) {
    // console.log(errors[name]?.message);

  return (
    <div>
        <input 
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className='border w-full border-gray-400 
        rounded-md p-1 px-4'    
        />

        {
            errors[name] && <p className='text-sm text-red-600'>{errors[name].message}</p>
        }
    </div>
  )
}

export default FormInput