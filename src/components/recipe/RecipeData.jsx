import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAuthStore from "../../stores/auth-store";

// const json = {
//     name:"jfuydjuy",
//     ingredient:[]
// }

function RecipeData() {
  const [isLike, setIsLike] = useState(false);

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  console.log("user", user);
  const userId = user.id;
  console.log("token :>> ", token);

  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    foodImage: null,
    description: "",
    method: [],
    ingredient: [],
    category: "",
    firstname: "",
    lastname: "",
    profileImage: "",
    creatorId: "",
    tempNumber: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
  });

  const { id } = useParams();
  console.log("id", id);

  const getData = async () => {
    const data = await axios.get(`http://localhost:8000/api/recipes/${id}`);
    const ingredient = JSON.parse(data.data.recipe.ingredient);
    const method = JSON.parse(data.data.recipe.method);
    const { name, foodImage, description, category, likes } = data.data.recipe;
    const {
      firstname,
      lastname,
      profileImage,
      id: creatorId,
    } = data.data.recipe.user;

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
    console.log("recipe id------", id);
    console.log("likes", likes);
    console.log("userId", userId);

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
      profileImage,
      creatorId,
    }));
    const likedByMe = likes.filter((el) => el.userId === userId);
    console.log("likedByMe", likedByMe);
    setIsLike(likedByMe.length > 0);
  };
  console.log("recipeeeeeeeeeeeeeeeeeeeeeeee", recipe);

  console.log("Am I like it?", isLike);

  useEffect(() => {
    getData();
  }, []);

  const hdlLike = async () => {
    try {
      if (!isLike) {
        const rs = await axios.post(
          "http://localhost:8000/api/like",
          { recipeId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsLike(true);
        console.log("liked", rs);
      }
      if (isLike) {
        const rs = await axios.delete(`http://localhost:8000/api/like/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLike(false);
        console.log("unliked", rs);
      }
    } catch (error) {
      console.log("like error", error);
    }
  };
  console.log("creatorId", recipe.creatorId);
  return (
    <div className="max-w-2xl mx-auto bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden mt-30 p-6 border border-gray-200">
      <div className="relative">
        <img
          src={recipe.foodImage}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {recipe.category}
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-extrabold text-gray-800">{recipe.name}</h1>
        <p className="text-gray-500 text-sm mt-1">
          by {recipe.firstname} {recipe.lastname}
        </p>
      </div>

      <p className="text-gray-700 mt-4 text-lg">{recipe.description}</p>
      <Link
        to={
          token
            ? `/user/profile/${recipe.creatorId}`
            : `/profile/${recipe.creatorId}`
        }
      >
        <div className="flex items-center gap-4 mt-6">
          <img
            src={recipe.profileImage}
            alt="User profile"
            className="w-12 h-12 rounded-full shadow-md border-2 border-gray-200"
          />
          <span className="font-semibold text-gray-800">
            {recipe.firstname} {recipe.lastname}
          </span>
        </div>
      </Link>

      <div className="mt-6">
        <p className="font-bold text-lg text-gray-800 mb-2">🛒 ส่วนผสม</p>
        <ol className="grid grid-cols-2 gap-3 list-decimal list-inside">
          {recipe.ingredient.map((el) => {
            if (el.text) {
              return (
                <li
                  key={el.id}
                  className=" bg-gray-100 text-gray-800 p-2 rounded-lg shadow-sm items-center"
                >
                  {el.text}
                </li>
              );
            }
          })}
        </ol>
      </div>

      <div className="mt-6">
        <p className="font-bold text-lg text-gray-800 mb-2">🍳 วิธีทำ</p>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.method.map((el) => {
            if (el.text) {
              return (
                <li key={el.id} className="ml-4">
                  {el.text}
                </li>
              );
            }
          })}
        </ol>
      </div>

      <div className="flex justify-between mt-8">
        {token && userId === recipe.creatorId ? (
          <Link to={`/user/update-recipe/${id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
              แก้ไข
            </button>
          </Link>
        ) : (
          <></>
        )}

        {user && (
          <button
            className={`px-4 py-2 font-semibold rounded-lg shadow-md transition hover: cursor-pointer ${
              isLike ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={hdlLike}
          >
            {isLike ? "❤️ Liked" : "🤍 Like"}
          </button>
        )}

        <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition hover: cursor-pointer">
          💬 Comment
        </button>

        <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition hover: cursor-pointer">
          ⭐ Favorite
        </button>
      </div>
      <div>comment</div>
    </div>
  );
}

export default RecipeData;
