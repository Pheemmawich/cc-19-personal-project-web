import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import Signout from "./user/Signout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChefHat, Search } from "lucide-react";
import axios from "axios";

function MainNav() {
  //   const [category, setCategory] = useState("");
  //   const [recipesByCategory, setRecipeByCategory] = useState([]);

  //   const hdlOnChangeCategory = () => {
  //     setCategory(e.target.value)
  //   }

  //   const getRecipesByCategory = async () => {
  //     const data = await axios.get(`/recipes/by-category/${category}`);
  //     console.log("recipe by category", data);
  //   };

  //   useEffect(() => {
  //     getRecipesByCategory();
  //   }, []);

  return (
    <nav className="z-10 flex justify-center items-center gap-40  bg-transparent  py-4 px-10 fixed top-0 w-full">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
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
        <Link
          to="/register"
          className="px-6 py-2 bg-teal-400 text-white rounded-full shadow-md hover:bg-teal-500 transition-all"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-teal-400 text-white rounded-full shadow-md hover:bg-teal-500 transition-all"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default MainNav;
