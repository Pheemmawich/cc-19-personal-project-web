import axios from "axios";
import React, { useState } from "react";
import { createAlert } from "../../utils/createAlert";

const initialValue = {
  identity: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  //Javascript
  const [value, setValue] = useState(initialValue);

  const hdlOnChange = (e) => {
    //code body
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const hdlOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/register", value);
      // setValue(initialValue)
      createAlert("success", "register success");
      console.log(res);
    } catch (error) {
      createAlert("info", error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex w-full h-full justify-end">
      {/* Card */}
      <div className="w-64 p-4 rounded-md shadow-md border">
        <h1 className="text-xl font-bold text-blue-900 text-center">
          Register
        </h1>
        {/* Form */}
        <form onSubmit={hdlOnSubmit}>
          <div className="flex flex-col gap-2 py-4">
            <input
              placeholder="Email or Phone Number"
              type="text"
              name="identity"
              className="border w-full border-gray-400 
            rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="Firstname"
              type="text"
              name="firstname"
              className="border w-full border-gray-400 
            rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="Lastname"
              type="text"
              name="lastname"
              className="border w-full border-gray-400 
            rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="Password"
              type="text"
              name="password"
              className="border w-full border-gray-400 
            rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
            <input
              placeholder="Confirm Password"
              type="text"
              name="confirmPassword"
              className="border w-full border-gray-400 
            rounded-md p-1 px-4"
              onChange={hdlOnChange}
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-yellow-400 font-bold px-2 py-1 rounded-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
