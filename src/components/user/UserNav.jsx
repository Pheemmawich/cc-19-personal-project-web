import {
  ChefHat,
  CircleUserRound,
  LogOut,
  Search,
  SquareUserRound,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import Logout from "../Logout";
import useAuthStore from "../../stores/auth-store";

function UserNav() {
  const { actionLogout } = useAuthStore();
  return (
    <>
      <div className="opacity-80 absolute bg-black h-20"></div>
      <nav className="z-10 flex mx-auto justify-center items-center gap-40 rounded-b-4xl bg-transparent py-4 px-10 fixed top-0 w-[70%]">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link to="/user" className="flex items-center gap-2">
            <ChefHat color="white" className="w-8 h-8" />
            <span className="text-white text-3xl font-bold">Let's Cook</span>
          </Link>
        </div>

        {/* Center Section (Search) */}
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-md">
          <select>
            <option value="" disabled>
              เลือกประเภทอาหาร
            </option>
            <option value="อาหารคาว">อาหารคาว</option>
            <option value="ของหวาน">ของหวาน</option>
            <option value="อาหารจานหลัก">อาหารจานหลัก</option>
            <option value="อาหารทานเล่น">อาหารทานเล่น</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
          </select>
          <input
            type="text"
            placeholder="Search for recipes..."
            className="bg-transparent text-teal-700 placeholder:text-teal-500 text-lg focus:outline-none w-48 rounded-full px-4 py-2"
          />
          <button className="bg-teal-400 text-white rounded-full p-2 hover:bg-teal-500 transition-all">
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link to="/user/profile">
            <CircleUserRound
              size={50}
              className="text-white bg-teal-400 hover:bg-teal-500 rounded-full p-0"
            />
          </Link>
          <Link
            onClick={actionLogout}
            to="/"
            className="flex px-6 py-2 bg-teal-400 text-white rounded-full shadow-md hover:bg-teal-500 transition-all"
          >
            Logout
            <LogOut />
          </Link>
        </div>
      </nav>
    </>

    // <nav
    //     className = 'flex justify-between bg-yellow-200 text green-900 font-bold px-8 py-2 my-2 rounded-md shadow-md'
    // >
    //     <div className="flex gap-4">
    //         <Link to = '/user'>Logo</Link>
    //         <Link to = '/user'>Home</Link>

    //     </div>
    //     <div className="flex gap-4">
    //         <Link to = '/user/profile'><SquareUserRound/></Link>
    //         <Logout/>
    //     </div>
    // </nav>
  );
}

export default UserNav;
