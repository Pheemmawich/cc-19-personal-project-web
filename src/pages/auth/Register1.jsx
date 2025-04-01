import axios from 'axios'
import React, { useState } from 'react'
import { createAlert } from '../../utils/createAlert'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import Buttons from '../../components/form/Buttons'

//validator
import { registerSchema } from '../../utils/validators'
import { zodResolver } from '@hookform/resolvers/zod' 
import { actionRegister } from '../../api/auth'

function Register1() {

  const {register, handleSubmit, formState, reset} = useForm({
    resolver : zodResolver(registerSchema)
  })
  const { isSubmitting, errors} = formState

  // console.log(errors)

  const hdlOnSubmit = async (value) => {
    // e.preventDefault()

    // Delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const res = await actionRegister(value)
      // setValue(initialValue)
      createAlert('success', 'register success')
      reset()
      console.log(res);
    } catch (error) {
      createAlert('info', error.response?.data?.message)
      console.log(error.response?.data?.message);
    }
  }

  return (
  <div className="flex w-full h-screen justify-center items-center">
    <div className="w-full max-w-md ml-0 p-10 rounded-2xl shadow-black bg-opacity-80">
      <h1 className="text-5xl font-extrabold text-white text-center mb-8 tracking-wide">
        ลงทะเบียน
      </h1>
  
      {/* ฟอร์ม */}
      <form className="bg-opacity-0" onSubmit={handleSubmit(hdlOnSubmit)}>
        <div className="flex flex-col gap-6 mb-6">
          <FormInput register={register} name="firstname" errors={errors} placeholder="ชื่อจริง" />
          <FormInput register={register} name="lastname" errors={errors} placeholder="นามสกุล" />
          <FormInput register={register} name="identity" errors={errors} placeholder="Email หรือ หมายเลขโทรศัพท์" />
          <FormInput register={register} name="password" errors={errors} type="password" placeholder="รหัสผ่าน" />
          <FormInput register={register} name="confirmPassword" errors={errors} type="password" placeholder="ยืนยันรหัสผ่าน" />
        </div>
  
        {/* ปุ่มส่งฟอร์ม */}
        <div className="flex justify-center mt-8">
          <Buttons isSubmitting={isSubmitting} label="ลงทะเบียน" />
        </div>
      </form>
    </div>
  </div>

  )
}

export default Register1