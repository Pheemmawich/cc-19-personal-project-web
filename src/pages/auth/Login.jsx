import axios from 'axios'
import React, { useState } from 'react'
import { createAlert } from '../../utils/createAlert'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import Buttons from '../../components/form/Buttons'
import { useNavigate } from 'react-router'

//validator
import { loginSchema } from '../../utils/validators'
import { zodResolver } from '@hookform/resolvers/zod' 
import { actionLogin } from '../../api/auth'
import useAuthStore from '../../stores/auth-store'

function Login() {
  //Javascript

  //zustand
  const actionLoginWithZustand = useAuthStore((state) => state.actionLoginWithZustand)
  // console.log(actionLoginWithZustand)
 
  const navigate = useNavigate()

  const roleRedirect = (role) => {
    if(role === 'ADMIN'){
      navigate('/admin')
    }else{
      navigate('/user')
    }
  }

  const {register, handleSubmit, formState, reset} = useForm({
    resolver : zodResolver(loginSchema)
  })
  const { isSubmitting, errors} = formState

  // console.log(errors)

  const hdlOnSubmit = async (value) => {
    // e.preventDefault()

    // Delay
    await new Promise((resolve) => setTimeout(resolve, 500))

      const res = await actionLoginWithZustand(value)
      console.log(res);

      if(res.success){
        roleRedirect(res.role)
        reset()
      }  
      
      
      // const res = await actionLogin(value)
      // // setValue(initialValue)
      // createAlert('success', 'Login success')
      // // reset()
      // console.log(res);
      // const role = res.data.user.role
      // console.log(role);
      // // roleRedirect(role);
  
  }

  

  return (
    <div className="flex w-full h-full justify-center py-5">
      {/* Card */}
      <div className="w-64 p-4 rounded-md shadow-md border" >

        <h1 className="text-xl font-bold text-blue-900 text-center">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(hdlOnSubmit)}>

          <div className='flex flex-col gap-2 py-4'>
            <FormInput register={register} name="identity" errors = {errors} />
            <FormInput register={register} name="password" errors = {errors} type = 'password'/>
          </div>

          <div className="flex justify-center">
            <Buttons isSubmitting={isSubmitting} label={'Login'}/>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login