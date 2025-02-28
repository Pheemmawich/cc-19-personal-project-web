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
    <div className="flex w-full h-full justify-center py-10">
      {/* Card with Gradient background */}
      <div className="w-96 p-10 rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-300 via-yellow-100 to-white">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6 tracking-wide">
          เข้าสู่ระบบ
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(hdlOnSubmit)}>

          <div className="flex flex-col gap-6 mb-6">
            <FormInput register={register} name="identity" errors={errors} placeholder="Email หรือ หมายเลขโทรศัพท์" />
            <FormInput register={register} name="password" errors={errors} type="password" placeholder="รหัสผ่าน" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Buttons isSubmitting={isSubmitting} label="เข้าสู่ระบบ" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login