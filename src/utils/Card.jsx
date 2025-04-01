import { Star } from "lucide-react";
import React, { useState } from "react";
import useLikeStore from "../stores/like-store";
import axios from "axios";
import useAuthStore from "../stores/auth-store";

function Card(props) {
  const [isLike, setIsLike] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const allLikes = useLikeStore((state) => state.likes);
  const actionSetLike = useLikeStore((state) => state.actionSetLike);

  const token = useAuthStore((state) => state.token);

  const {
    name,
    description,
    foodImage,
    category,
    firstname,
    lastname,
    likes,
    profileImage,
  } = props;

  const hdlLike = async () => {
    const rsLike = await axios.post("http://localhost:8000/api/like", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("rsLike :>> ", rsLike);
    setIsLike(isLike ? false : true);
    console.log("isLike :>> ", isLike);
  };

  return (
    <div className="card bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-xl w-90 p-4 border border-gray-200 mt-12 relative">
      {/* รูปภาพหลัก */}
      <figure className="w-full h-[300px] overflow-hidden relative">
        <img
          className="w-full h-full object-cover"
          src={foodImage}
          alt={name}
        />
        {/* ป้าย NEW ตรงมุมขวาบน */}
        <div className="absolute top-3 right-3 badge bg-green-500 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-md">
          NEW
        </div>
      </figure>

      <div className="mt-4">
        {/* ชื่อสูตรอาหาร (จำกัด 1 บรรทัด) */}
        <h2 className="text-xl font-extrabold text-gray-800 truncate">
          {name}
        </h2>

        {/* Creator Info */}
        <p className="text-gray-500  mt-2 mb-2">by</p>
        <div className="flex items-center space-x-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={profileImage}
            alt="profile image"
          />
          <p className="font-semibold text-gray-800">
            {firstname} {lastname}
          </p>
        </div>

        {/* คำอธิบาย (จำกัด 3 บรรทัด + ดูเพิ่มเติม) */}
        <p
          className={`text-gray-700 mt-2 ${
            showFullDescription ? "" : "line-clamp-3"
          }`}
        >
          {description}
        </p>
        {!showFullDescription && (
          <button
            className="text-blue-500 mt-2 text-sm"
            onClick={() => setShowFullDescription(true)}
          >
            ดูเพิ่มเติม
          </button>
        )}

        {/* กล่อง Like + Category */}
        <div className="flex justify-between items-center mt-4">
          <div
            className="flex gap-3 items-center"
            onClick={() => console.log("Liked!")}
          >
            <Star className="stroke-white border-2 rounded-full p-2 bg-amber-300" />
            <p className="font-semibold text-gray-800">{likes.length}</p>
          </div>
          <div className="badge bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
