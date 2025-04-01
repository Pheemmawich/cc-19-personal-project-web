import axios from "axios";
import React, { useEffect, useState } from "react";
import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import Buttons from "../../components/form/Buttons";
import { actionRegister } from "../../api/auth";
import useAuthStore from "../../stores/auth-store";
import { useParams, Link, Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { PlusCircle, Trash2 } from "lucide-react";

function UpdateRecipe() {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState(""); //state ของชื่อ
  const [newFoodPhoto, setNewFoodPhoto] = useState(null); //state ของรูป(เป็นไฟล์)
  const [foodPhoto, setFoodPhoto] = useState(null); //state ของรูป(เป็นไฟล์)
  const [recipeDescription, setRecipeDescription] = useState(""); //state ของคำอธิบาย
  const [category, setCategory] = useState(""); //state category

  const [ingredient, setIngredient] = useState([
    { id: 1, text: "ไก่" },
    { id: 2, text: "กระเพา" },
    { id: 3, text: "" },
  ]); //state ของวัตถุดิบ
  const [procedure, setProcedure] = useState([
    { id: 1, text: "หั่นไก่" },
    { id: 2, text: "ผัดกับกระเพา" },
    { id: 3, text: "" },
  ]); //state วิธีทำ

  const token = useAuthStore((state) => state.token); //เอาtoken มาจาก store zustand

  const { id } = useParams();
  console.log(id);

  const getData = async () => {
    const data = await axios.get(`http://localhost:8000/api/recipes/${id}`);
    const ingredient = JSON.parse(data.data.recipe.ingredient);
    const method = JSON.parse(data.data.recipe.method);
    const { name, foodImage, description, category } = data.data.recipe;
    const { firstname, lastname } = data.data.recipe.user;
    setRecipeName(name);
    setFoodPhoto(foodImage);
    setRecipeDescription(description);
    setIngredient(ingredient);
    setProcedure(method);
    setCategory(category.name);
    console.log("data.data.ingredient :>> ", data.data.recipe.ingredient);
    console.log("---------------------------------", data.data);
    console.log("ingredient------", ingredient);
    console.log("name------", name);
    console.log("method------", method);
    console.log("foodImage------", foodImage);
    console.log("description------", description);
    console.log("category------", category);
    console.log("firstname------", firstname);
    console.log("lastname------", lastname);
    console.log("id------", id);

    setRecipe((pre) => ({
      ...pre,
      id,
      name,
      foodImage,
      description,
      method,
      ingredient,
      category: category.name,
      firstname,
      lastname,
    }));
  };

  useEffect(() => {
    getData();
  }, []);

  const hdlChangeIngredient = (e, id) => {
    setIngredient((prev) =>
      prev.map((el) => {
        // console.log("ค่าในonchange", el)
        return el.id !== id ? el : { ...el, text: e.target.value }; //ฟังก์ชันการเปลี่ยนค่าในinput ingredient
      })
    );
  };

  const hdlOnChangeProcedure = (e, id) => {
    setProcedure((prev) =>
      prev.map((el) => {
        // console.log("ค่าในonchange", el)
        return el.id !== id ? el : { ...el, text: e.target.value }; //ฟังก์ชันการเปลี่ยนค่าในinput procedure
      })
    );
  };

  const hdlOnSubmit = async (e) => {
    e.preventDefault();
    // Delay
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const formdata = new FormData();
    formdata.append("name", recipeName);
    formdata.append("image", newFoodPhoto);
    formdata.append("description", recipeDescription);
    formdata.append("method", JSON.stringify(procedure));
    formdata.append("ingredient", JSON.stringify(ingredient));
    formdata.append("category", category);

    console.log("formdata", formdata);
    try {
      Swal.fire({
        icon: "info",
        text: "Are you sure to update recipe?",
        // showDenyButton:true,
        showCancelButton: true,
      }).then(async (data) => {
        console.log(data.isConfirmed);
        if (data.isConfirmed) {
          const res = await axios.patch(
            `http://localhost:8000/api/recipes/update-recipe/${id}`,
            formdata,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          getData();
          // setValue(initialValue)
          createAlert("success", "recipe update success");
          navigate("/user/profile");
          //   reset()
          console.log(res);
        }
      });
    } catch (error) {
      //   createAlert('info', error.response?.data?.message)
      //   console.log(error.response?.data?.message);
      console.log(error);
    }
  };

  const addIngredient = () =>
    setIngredient((pre) => [
      ...pre,
      {
        id: pre.length > 0 ? pre[pre.length - 1].id + 1 : 1,
        text: "",
      },
    ]);

  const hdlDelIngredient = (id) => {
    // console.log("iddd",id);
    setIngredient((pre) => {
      if (pre.length > 1) {
        return pre.filter((el) => el.id !== id);
      } else {
        return pre;
      }
    });
  };

  const addProcedure = () =>
    setProcedure((pre) => [
      ...pre,
      { id: pre.length > 0 ? pre[pre.length - 1].id + 1 : 1, text: "" },
    ]);

  const hdlDelProcedure = () => {
    setProcedure((pre) => (pre.length > 1 ? [...pre.slice(0, -1)] : pre));
  };

  const hdlChangeName = (e) => {
    setRecipeName(e.target.value);
    console.log(recipeName);
  };
  console.log(recipeName);

  const hdlChangeDescription = (e) => {
    setRecipeDescription(e.target.value);
  };
  // console.log(recipeDescription);

  const hdlFileChange = (e) => {
    console.log(e.target.files);
    setNewFoodPhoto(e.target.files[0]);
  };

  const hdlChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  console.log(category);

  return (
    <div className="w-full max-w-3xl my-12 mx-auto bg-white p-10 shadow-xl rounded-3xl border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        📝 เขียนสูตรอาหาร
      </h1>
      <form onSubmit={hdlOnSubmit} className="space-y-6">
        {/* ชื่อสูตร */}
        <input
          type="text"
          className="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-gray-300"
          placeholder="🍲 ชื่อสูตรอาหาร"
          onChange={hdlChangeName}
          value={recipeName}
        />
        {/* รูปภาพ */}
        <div className="relative">
          <div className="h-80 flex items-center justify-center border rounded-lg overflow-hidden relative">
            <input
              type="file"
              onChange={hdlFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {newFoodPhoto ? (
              <img
                src={URL.createObjectURL(newFoodPhoto)}
                alt="Food"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={foodPhoto}
                alt="Food"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        {/* คำอธิบาย */}
        <textarea
          className="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-gray-300"
          rows="3"
          placeholder="📖 คำอธิบายสูตรอาหาร"
          onChange={hdlChangeDescription}
          value={recipeDescription}
        />
        {/* ส่วนผสม */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">🥕 ส่วนผสม</h2>
          {ingredient.map((el, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <input
                value={el.text}
                onChange={(e) => hdlChangeIngredient(e, el.id)}
                type="text"
                className="flex-1 p-3 border rounded-lg text-lg focus:ring-2 focus:ring-gray-300"
                placeholder="ส่วนผสม"
              />
              <button
                onClick={() => hdlDelIngredient(el.id)}
                type="button"
                className="text-red-500 font-bold text-xl hover:cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg text-lg hover:bg-gray-300 hover:cursor-pointer"
          >
            ➕ เพิ่มส่วนผสม
          </button>
        </div>
        {/* วิธีการทำ */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">👩‍🍳 วิธีการทำ</h2>
          {procedure.map((el, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 text-gray-800 flex items-center justify-center rounded-full font-bold">
                {el.id}
              </div>
              <input
                type="text"
                className="flex-1 p-3 border rounded-lg text-lg focus:ring-2 focus:ring-gray-300"
                placeholder="ขั้นตอน"
                value={el.text}
                onChange={(e) => hdlOnChangeProcedure(e, el.id)}
              />
              <button
                onClick={() => hdlDelProcedure(el.id)}
                type="button"
                className="text-red-500 font-bold text-xl hover:cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addProcedure}
            type="button"
            className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg text-lg hover:bg-gray-300 hover:cursor-pointer"
          >
            ➕ เพิ่มขั้นตอน
          </button>
        </div>
        {/* หมวดหมู่ */}
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">
            📌 เลือกหมวดหมู่
          </label>
          <select
            value={category}
            onChange={hdlChangeCategory}
            className="w-full p-3 border rounded-lg text-lg focus:ring-2 focus:ring-gray-300"
          >
            <option value="" disabled>
              -- กรุณาเลือก --
            </option>
            <option value="อาหารคาว">อาหารคาว</option>
            <option value="ของหวาน">ของหวาน</option>
            <option value="อาหารจานหลัก">อาหารจานหลัก</option>
            <option value="อาหารทานเล่น">อาหารทานเล่น</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
          </select>
        </div>
        {/* ปุ่มส่ง */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-900 hover:cursor-pointer"
          >
            🚀 ส่งสูตรอาหาร
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateRecipe;
