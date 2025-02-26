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
    <div className="flex w-full h-full justify-center py-5">
      {/* Card */}
      <div className="w-64 p-4 rounded-md shadow-md border" >

        <h1 className="text-xl font-bold text-blue-900 text-center">
          Register1
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(hdlOnSubmit)}>

          <div className='flex flex-col gap-2 py-4'>
            <FormInput register={register} name="identity" errors = {errors} placeholder='Email or Phone number'/>
            <FormInput register={register} name="firstname" errors = {errors} placeholder='Firstname'/>
            <FormInput register={register} name="lastname" errors = {errors} placeholder='Lastname'/>
            <FormInput register={register} name="password" errors = {errors} type = 'password' placeholder='Password'/>
            <FormInput register={register} name="confirmPassword" errors = {errors} type = 'password'placeholder='Confirm Password'/>
          </div>

          <div className="flex justify-center">
            <Buttons isSubmitting={isSubmitting} label={'register'}/>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Register1