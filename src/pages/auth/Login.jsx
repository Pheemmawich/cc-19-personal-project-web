import axios from "axios";
import React, { useState } from "react";
import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import Buttons from "../../components/form/Buttons";
import { useNavigate } from "react-router";

//validator
import { loginSchema } from "../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionLogin } from "../../api/auth";
import useAuthStore from "../../stores/auth-store";

function Login() {
  //Javascript

  //zustand
  const actionLoginWithZustand = useAuthStore(
    (state) => state.actionLoginWithZustand
  );
  // console.log(actionLoginWithZustand)

  const navigate = useNavigate();

  const roleRedirect = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;

  // console.log(errors)
  const hdlOnSubmit = async (value) => {
    // e.preventDefault()

    // Delay
    console.log("Before delay");
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("After delay");

    const res = await actionLoginWithZustand(value);
    console.log(res);

    if (res.success) {
      roleRedirect(res.role);
      reset();
    }

    // const res = await actionLogin(value)
    // // setValue(initialValue)
    // createAlert('success', 'Login success')
    // // reset()
    // console.log(res);
    // const role = res.data.user.role
    // console.log(role);
    // // roleRedirect(role);
  };

  return (
    <div className="flex self-center w-screen h-screen justify-center py-10 ">
      {/* Card with Gradient background */}
      <div className="flex flex-col self-center w-126 p-10 rounded-2xl bg-transparent">
        <h1 className="text-5xl self-center  font-bold text-white text-center mb-10 tracking-wide p-3 pb-4 rounded-[12px]">
          เข้าสู่ระบบ
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(hdlOnSubmit)}
          className="flex flex-col justify-evenly"
        >
          <div className="flex flex-col justify-between gap-10 mb-5 translate-y-[10px]">
            <FormInput
              register={register}
              name="identity"
              errors={errors}
              placeholder="Email หรือ หมายเลขโทรศัพท์"
            />
            <FormInput
              register={register}
              name="password"
              errors={errors}
              type="password"
              placeholder="รหัสผ่าน"
            />
          </div>

          {/* Submit Button */}

          <div className="flex justify-center mt-12 hover:cursor-pointer">
            <Buttons isSubmitting={isSubmitting} label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
