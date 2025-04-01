import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/auth-store";
import axios from "axios";
import { Link } from "react-router";

function Creator() {
  const token = useAuthStore((state) => state.token);

  const [topCreators, setTopCreators] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      `http://localhost:8000/api/user/creator/top-10`
    );
    // console.log("top 10 creator", data);

    setTopCreators(data.data);
  };

  console.log("topCreators :>> ", topCreators);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-85 mx-auto bg-white bg-opacity-30 backdrop-blur-lg rounded-l-2xl shadow-2xl overflow-hidden p-6 border border-gray-200 fixed right-0 top-0 h-full">
      <h2 className="text-xl font-extrabold text-purple-900 mb-6 ">
        Top Creators
      </h2>
      <div className="space-y-6">
        {topCreators.map((creator, index) => (
          <Link
            key={creator.id}
            className="flex items-center"
            to={
              token ? `/user/profile/${creator.id}` : `/profile/${creator.id}`
            }
          >
            {/* <div key={creator.id} className="flex items-center"> */}
            <img
              src={creator.profileImage}
              alt={`Profile picture of ${creator.firstname}`}
              className="w-14 h-14 rounded-full border-4 border-white shadow-lg ring-2 ring-yellow-500"
            />
            <div className="ml-4 flex-1">
              <p className="font-bold text-gray-800">
                {creator.firstname} {creator.lastname}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="ml-1 font-semibold text-gray-800">
                {creator.totalLikes}
              </span>
              <button
                className="px-2 py-1 font-semibold rounded-lg shadow-md transition 
                  isLike  bg-red-500 text-white"
              >
                Liked❤️
              </button>
            </div>
            {/* </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Creator;
