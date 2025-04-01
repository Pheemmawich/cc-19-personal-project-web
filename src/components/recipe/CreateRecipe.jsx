import axios from "axios";
import React, { useRef, useState } from "react";
import { createAlert } from "../../utils/createAlert";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import Buttons from "../../components/form/Buttons";
import { actionRegister } from "../../api/auth";
import useAuthStore from "../../stores/auth-store";
import { Camera } from "lucide-react";
import Swal from "sweetalert2";

function CreateRecipe() {
  // const [data,setData]=useState([1,2])
  // const test =async()=>{
  //     const rs = await axios.get('https://pokeapi.co/api/v2/pokemon')
  //     // setData([1,2])
  // }
  // // test()
  const refInput = useRef(null);

  const [recipeName, setRecipeName] = useState("กระเพาไก่"); //state ของชื่อ

  const [foodPhoto, setFoodPhoto] = useState(null); //state ของรูป(เป็นไฟล์)

  const [recipeDescription, setRecipeDescription] = useState("อร่อย"); //state ของคำอธิบาย

  const [ingredient, setIngredient] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
  ]); //state ของวัตถุดิบ

  const [procedure, setProcedure] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
  ]); //state วิธีทำ

  const [category, setCategory] = useState(""); //state category

  const token = useAuthStore((state) => state.token); //เอาtoken มาจาก store zustand

  // const {register, handleSubmit, formState, reset} = useForm()
  // const { isSubmitting, errors} = formState

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
    formdata.append("image", foodPhoto);
    formdata.append("description", recipeDescription);
    formdata.append("method", JSON.stringify(procedure));
    formdata.append("ingredient", JSON.stringify(ingredient));
    formdata.append("category", category);

    try {
      Swal.fire({
        icon: "info",
        text: "Are you sure to create recipe?",
        // showDenyButton:true,
        showCancelButton: true,
      }).then(async (data) => {
        console.log(data.isConfirmed);
        if (data.isConfirmed) {
          const res = await axios.post(
            "http://localhost:8000/api/recipes/create-recipe",
            formdata,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // setRecipeName(res)
          // setValue(initialValue)
          createAlert("success", "recipe post success");
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
    setFoodPhoto(e.target.files[0]);
  };

  const hdlChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  console.log(category);

  const handleClickCamera = () => {
    refInput.current.click(); // เปิด dialog ของ input file
  };

  return (
    <div className="mt-30 w-180 max-w-4xl mx-auto bg-white p-10 shadow-xl rounded-xl ">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        เขียนสูตรอาหาร
      </h1>

      <form onSubmit={hdlOnSubmit} className="space-y-8">
        {/* ชื่อสูตร */}
        <div className="">
          <input
            type="text"
            className="w-full bg-gradient-to-r from-white to-gray-100 text-gray-800 p-5 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 placeholder-gray-500 text-xl"
            placeholder="ชื่อสูตร"
            onChange={hdlChangeName}
            value={recipeName}
          />
        </div>

        {/* รูปภาพ */}
        <div className="">
          <div className=" flex items-center justify-center rounded-xl overflow-hidden border-1 border-yellow-500 shadow-xl h-120 ">
            <div className="">
              <input
                type="file"
                onChange={hdlFileChange}
                className="inset-0 w-full h-full cursor-pointer opacity-0"
                ref={refInput}
              />
              {/* <div className="right-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex justify-center items-center h-screen"> */}
              <div className="">
                <div className="flex justify-center">
                  {!foodPhoto && (
                    <Camera
                      onClick={handleClickCamera}
                      className="hover:cursor-pointer w-20 h-20 text-gray-700 "
                    />
                  )}
                </div>
                {!foodPhoto && (
                  <p className="mt-2 text-sm text-center text-gray-800">
                    เพิ่มรูปภาพ
                  </p>
                )}
              </div>
              {/* </div> */}
              {foodPhoto && (
                <img
                  src={URL.createObjectURL(foodPhoto)}
                  alt="Food Photo"
                  className="w-full h-full object-cover "
                  onClick={handleClickCamera}
                />
              )}
            </div>
          </div>
        </div>

        {/* คำอธิบาย */}
        <div>
          <textarea
            className="w-full bg-gradient-to-r from-white to-gray-100 text-gray-800 p-5 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 placeholder-gray-500 text-lg"
            rows="4"
            placeholder="คำอธิบาย"
            onChange={hdlChangeDescription}
            value={recipeDescription}
          />
        </div>

        {/* ส่วนผสม */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">ส่วนผสม</h2>
          {ingredient.map((el, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                value={el.text}
                onChange={(e) => hdlChangeIngredient(e, el.id)}
                type="text"
                className="flex-1 bg-gradient-to-r from-white to-gray-100 text-gray-800 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                placeholder="ส่วนผสม"
              />
              <button
                onClick={() => hdlDelIngredient(el.id)}
                type="button"
                className="text-2xl text-red-600 hover:text-red-800 transition-all"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mx-auto w-full bg-yellow-200 text-gray-800 p-4 rounded-xl shadow-lg hover:bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 cursor-pointer"
          >
            + เพิ่ม
          </button>
        </div>

        {/* วิธีการทำ */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            วิธีการทำ
          </h2>
          {procedure.map((el, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-yellow-200 text-white flex items-center justify-center rounded-full text-xl font-bold">
                {el.id}
              </div>
              <input
                type="text"
                className="flex-1 bg-gradient-to-r from-white to-gray-100 text-gray-800 p-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                placeholder="ขั้นตอน"
                value={el.text}
                onChange={(e) => hdlOnChangeProcedure(e, el.id)}
              />
              <button
                onClick={hdlDelProcedure}
                type="button"
                className="text-2xl text-red-600 hover:text-red-800 transition-all cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            onClick={addProcedure}
            type="button"
            className="mx-auto w-full bg-yellow-200 text-gray-800 p-4 rounded-xl shadow-lg hover:bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 cursor-pointer"
          >
            + เพิ่ม
          </button>
        </div>

        {/* หมวดหมู่ */}
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-3">
            เลือกหมวดหมู่
          </label>
          <select
            value={category}
            onChange={hdlChangeCategory}
            className="w-full bg-gradient-to-r from-white to-gray-100 text-gray-800 p-4 border-2 border-yellow-500 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg"
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
          {category && (
            <p className="mt-2 text-gray-800">คุณเลือก: {category}</p>
          )}
        </div>

        {/* ปุ่มส่ง */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-200 text-gray-800 p-5 rounded-xl shadow-lg hover:bg-gradient-to-r from-yellow-400 to-yellow-500 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            ส่งสูตรอาหาร
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
