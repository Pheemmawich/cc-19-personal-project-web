import React from 'react'

function RecipeData() {
  return (
    <div className="max-w-md mx-auto bg-yellow-500 rounded-lg overflow-hidden shadow-lg mt-10">
        <img
        src="https://storage.googleapis.com/a1aa/image/1YmvVkoK-SndClWEaWjPighM8Da2ML7Gct7M2OsIuno.jpg"
        alt="A plate of omelette topped with ham and cheese"
        className="w-full"
        />
        <div className="p-4">
        <h1 className="text-xl font-bold mb-2">ข้าวไข่ข้นแฮมชีส</h1>
        <p className="text-sm text-gray-700 mb-2">by</p>
        <div className="flex items-center mb-4">
            <img
            src="https://storage.googleapis.com/a1aa/image/7OAw-d3hcTGkber2RGSTDWwVtpjnHEQimRnp51h732s.jpg"
            alt="Profile picture of Andy Bobby"
            className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-bold">Andy Bobby</span>
        </div>
        <p className="font-bold mb-2">description</p>
        <p className="text-gray-700 mb-4">ต้มยำรสชาติจัดจ้านในแบบที่เราชอบ</p>
        <div className="flex justify-between mb-4">
            <button className="bg-white text-black font-bold py-2 px-4 rounded">like</button>
            <button className="bg-white text-black font-bold py-2 px-4 rounded">comment</button>
            <button className="bg-white text-black font-bold py-2 px-4 rounded">save</button>
        </div>
        <p className="font-bold mb-2">ส่วนผสม</p>
        <div className="flex justify-between mb-2">
            <span>หมู</span>
            <span>1 กก.</span>
        </div>
        <p className="font-bold mb-2">วิธีทำ</p>
        <p className="mb-2">1.ล้างหมู</p>
        <img
            src="https://storage.googleapis.com/a1aa/image/WLFUEc9CEKOhChtaWVDkv0rIOouIliEC_whhJ_s9ZA0.jpg"
            alt="Image showing the process of washing pork"
            className="w-10 h-10 rounded-full"
        />
        </div>
    </div>
  )
}

export default RecipeData