import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import useAuthStore from '../../stores/auth-store'

function Profile() {
  const[profile,setProfile]=useState({
    id:'',
    firstname:'',
    lastname:'',
    email: '',
    phoneNumber: '',
    profileImage:null,
    coverImage:null,
})


const token = useAuthStore((state) => state.token)
const getData = async () => {
  console.log(token);
    const data = await axios.get('http://localhost:8000/api/getme', {
			headers : { Authorization : `Bearer ${token}`}
		})
    console.log(data)
    const {id, firstname, lastname, email, phoneNumber, profileImage, coverImage} = data.data.user
    setProfile(pre => ({...pre, id, firstname, lastname, email, phoneNumber, profileImage, coverImage}))
  }


  useEffect(() => {
      getData()
  },[])

  const navigate = useNavigate()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl m-auto">
    <div className="flex flex-col items-center">
      <img
        src="https://storage.googleapis.com/a1aa/image/p2gse5DTJVL8pUqGvq-cp46N-6kL0IRAb878pAib2P4.jpg"
        alt="Profile picture of Andy bobby"
        className="rounded-full w-24 h-24 mb-4"
        width="100"
        height="100"
      />
      <h2 className="text-xl font-semibold">{profile.firstname} {profile.lastname}</h2>
      <p className="text-gray-600 mt-2">Recipes(numbers)</p>
    </div>
    <div className="mt-6 space-y-4">
      <div className="bg-gray-200 p-4 rounded-lg flex items-center">
        <img
          src="https://storage.googleapis.com/a1aa/image/R1i5-8r-5Qs5GwFdAk73yJyqys9db1gVY6S80IcBzUQ.jpg"
          alt="Image of a dish"
          className="w-12 h-12 rounded-full mr-4"
          width="50"
          height="50"
        />
        <div>
          <Link to={"/user/recipe-data/23"}>
          <h3 className="font-semibold">กระเพาไก่</h3>
          <p className="text-gray-600">อ่าน 96 ครั้ง</p>
          <p className="text-gray-600">description</p>
          </Link>
          
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg flex items-center">
        <img
          src="https://storage.googleapis.com/a1aa/image/R1i5-8r-5Qs5GwFdAk73yJyqys9db1gVY6S80IcBzUQ.jpg"
          alt="Image of a dish"
          className="w-12 h-12 rounded-full mr-4"
          width="50"
          height="50"
        />
        <div>
          <h3 className="font-semibold">ห้องครัวไทยจ่ายตลาด</h3>
          <p className="text-gray-600">อ่าน 96 ครั้ง</p>
          <p className="text-gray-600">description</p>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg flex items-center">
        <img
          src="https://storage.googleapis.com/a1aa/image/R1i5-8r-5Qs5GwFdAk73yJyqys9db1gVY6S80IcBzUQ.jpg"
          alt="Image of a dish"
          className="w-12 h-12 rounded-full mr-4"
          width="50"
          height="50"
        />
        <div>
          <h3 className="font-semibold">ห้องครัวไทยจ่ายตลาด</h3>
          <p className="text-gray-600">อ่าน 96 ครั้ง</p>
          <p className="text-gray-600">description</p>
        </div>
      </div>
    </div>
    <button 
    className="mt-6 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full hover:cursor-pointer"
    onClick={() => navigate('/user/create-recipe')}
    >
      + เพิ่มสูตรอาหาร
    </button>
  </div>
  )
}

export default Profile