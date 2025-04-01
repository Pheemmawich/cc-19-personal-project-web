import axios from "axios";
import React, { useState } from "react";
import useIngredientStore from "../../stores/ingredient-store";

function GenerateMenu() {
  const actionSetIngredient = useIngredientStore(
    (state) => state.actionSetIngredient
  );
  const ingredients = useIngredientStore((state) => state.ingredients);

  const [ingredient, setIngredient] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
  ]);

  const hdlChangeIngredient = (e, id) => {
    setIngredient((prev) =>
      prev.map((el) => {
        console.log("ingredient ใน state", el);
        return el.id !== id ? el : { ...el, text: e.target.value }; //ฟังก์ชันการเปลี่ยนค่าในinput ingredient
      })
    );
    console.log("ingredienttt", ingredient);
  };

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

  const addIngredient = () =>
    setIngredient((pre) => [
      ...pre,
      {
        id: pre.length > 0 ? pre[pre.length - 1].id + 1 : 1,
        text: "",
      },
    ]);

  const hdlSubmitIngredient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/recipes/by-ingredient",
        ingredient
      );
      console.log("response", res.data.result);
      actionSetIngredient(res.data.result);
    } catch (error) {
      console.log("submit ingredient", error);
    }
  };
  console.log("ingredients", ingredients);

  return (
    <div className="flex justify-center min-h-screen bg-yellow-400 fixed left-0">
      <div className="bg-yellow-400 p-8   w-80">
        {/* <img src="../../../public/fridge.webp" alt="" /> */}
        <h1 className="text-center text-2xl font-bold text-black mb-4">
          create menu from ingredient
        </h1>
        <form onSubmit={hdlSubmitIngredient}>
          <div className="mb-4">
            <label className="block text-lg text-black mb-2">
              what in your refridge?
            </label>
            {ingredient.map((el, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <input
                  value={el.text}
                  onChange={(e) => hdlChangeIngredient(e, el.id)}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="ส่วนผสม"
                />

                <button
                  onClick={() => hdlDelIngredient(el.id)}
                  type="button"
                  className="text-2xl text-red-600 hover:text-red-800 transition-all hover:cursor-pointer"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-6">
            <button
              type="button"
              onClick={addIngredient}
              className="bg-gray-800 text-yellow-400 font-bold py-2 px-4 rounded hover:cursor-pointer"
            >
              {" "}
              + เพิ่ม
            </button>
            <button
              type="submit"
              className="bg-gray-800 text-yellow-400 font-bold py-2 px-4 rounded mr-8 hover:cursor-pointer"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenerateMenu;
