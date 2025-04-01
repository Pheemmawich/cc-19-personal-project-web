import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import useAuthStore from "../../stores/auth-store";
import { Camera, Pencil, Plus, SquarePlus, SquareX } from "lucide-react";
import defaultProfile from "../../assets/defaultProfile.svg";
import Swal from "sweetalert2";

function ProfileFromOther() {
  const refInput = useRef(null);

  const { creatorId } = useParams();
  console.log("creatorId :>> ", creatorId);

  const [profile, setProfile] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    profileImage: null,
    coverImage: null,
  });

  const [recipe, setRecipe] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  const token = useAuthStore((state) => state.token);

  const getData = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8000/api/user/${creatorId}`
      );
      console.log("creator data", data);
      const {
        id,
        firstname,
        lastname,
        email,
        phoneNumber,
        profileImage,
        coverImage,
      } = data.data.user;

      setProfile((pre) => ({
        ...pre,
        id,
        firstname,
        lastname,
        email,
        phoneNumber,
        profileImage,
        coverImage,
      }));
    } catch (error) {
      console.log("fetch user data error", error);
    }
  };
  console.log("profile", profile);

  const getRecipeData = async () => {
    try {
      const recipeData = await axios.get(
        `http://localhost:8000/api//recipes/by-userId/${creatorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("recipe data", recipeData);
      setRecipe(recipeData.data.recipes);
    } catch (error) {
      console.log("fetch recipe data error", error);
    }
  };
  console.log("recipe", recipe);

  useEffect(() => {
    getData();
    getRecipeData();
  }, []);

  const navigate = useNavigate();

  const hdlOnChange = (e) => {
    console.log("sdffd");
    setProfile((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };
  console.log("profile image", profile.profileImage);

  const hdlUpdateProfile = async () => {
    const formdata = new FormData();
    formdata.append("firstname", profile.firstname);
    formdata.append("lastname", profile.lastname);
    formdata.append("profileImage", profile.profileImage);

    try {
      const result = await axios.patch(
        "http://localhost:8000/api/update-profile",
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("update profile", result);
      setIsEdit(false);
    } catch (error) {
      console.log("update profile error", error);
    }
  };

  const hdlDeleteRecipe = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        icon: "info",
        text: "Are you sure to delete recipe?",
        // showDenyButton:true,
        showCancelButton: true,
      }).then(async (data) => {
        console.log(data.isConfirmed);
        if (data.isConfirmed) {
          await axios.delete(`http://localhost:8000/api/recipes/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          createAlert("success", "Delete Success!!");
          getRecipeData();
        }
      });
    } catch (error) {
      console.log("delete recipe error", error);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto mt-30 border border-gray-200">
      <div className="flex flex-col items-center">
        <div
          className={`relative ${isEdit ? "hover:cursor-pointer" : ""}`}
          onClick={() => refInput.current.click()}
        >
          {profile.profileImage && (
            <img
              src={
                typeof profile.profileImage === "string"
                  ? profile.profileImage
                  : URL.createObjectURL(profile.profileImage)
              }
              alt={`Profile picture of ${profile.firstname}`}
              className="rounded-full w-24 h-24 border-4 border-white shadow-lg ring-2 ring-yellow-500"
            />
          )}
          {isEdit && (
            <div className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow-md">
              <input type="file" hidden ref={refInput} onChange={hdlOnChange} />
              <Camera className="text-gray-600" />
            </div>
          )}
        </div>

        {isEdit ? (
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              className="w-[130px] rounded-lg border px-3 py-1 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={profile.firstname}
              onChange={(e) =>
                setProfile((pre) => ({ ...pre, firstname: e.target.value }))
              }
            />
            <input
              type="text"
              className="w-[130px] rounded-lg border px-3 py-1 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={profile.lastname}
              onChange={(e) =>
                setProfile((pre) => ({ ...pre, lastname: e.target.value }))
              }
            />
          </div>
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            {profile.firstname} {profile.lastname}
          </h2>
        )}
      </div>

      <p className="mt-4">สูตรอาหารของ {profile.firstname}</p>
      <hr className="mt-2 border-t border-gray-300 shadow-md" />

      <div className="mt-6 space-y-6">
        {recipe?.map((el) => (
          <div
            key={el.id}
            className="bg-gradient-to-br from-white to-yellow-50 border border-yellow-300 p-4 rounded-xl shadow-md flex items-center justify-between"
          >
            <Link
              to={
                token ? `/user/recipe-data/${el.id}` : `/recipe-data/${el.id}`
              }
              className="flex items-center gap-4"
            >
              <img
                src={el.foodImage}
                alt="Image of a dish"
                className="w-28 h-20 rounded-lg shadow-md"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {el.name}
                </h2>
                <p className="text-gray-600 mt-1">{el.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {token ? (
        <button
          className="flex items-center gap-2 bg-yellow-400 text-white font-semibold px-6 py-3 rounded-lg mt-8 shadow-md hover:cursor-pointer bg-yellow-500 hover:scale-105 transition mx-auto "
          onClick={() => navigate("/user/create-recipe")}
        >
          <SquarePlus className="w-5 h-5" />
          เพิ่มสูตรอาหาร
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileFromOther;
