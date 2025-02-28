import { useState } from "react";

export default function RecipeForm() {
    const [recipeName, setRecipeName] = useState("");
    const [foodPhoto, setFoodPhoto] = useState(null);
    const [recipeDescription, setRecipeDescription] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [procedure, setProcedure] = useState([]);
    const [category, setCategory] = useState("");

    const addIngredient = () => {
        setIngredient([...ingredient, { id: Date.now(), text: "" }]);
    };

    const addProcedure = () => {
        setProcedure([...procedure, { id: Date.now(), text: "" }]);
    };

    const handleFileChange = (e) => {
        setFoodPhoto(e.target.files[0]);
    };

    return (
        <div className="max-w-3xl mx-auto bg-yellow-100 p-8 rounded-2xl shadow-lg border border-yellow-300">
            <h1 className="text-3xl font-bold text-yellow-800 text-center mb-6">🍽️ เขียนสูตรอาหาร 🍽️</h1>
            
            <form>
                <input type="text" className="w-full p-3 border border-yellow-400 rounded-lg bg-yellow-50 mb-4" placeholder="ชื่อสูตรอาหาร" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                
                <div className="bg-yellow-200 h-52 flex items-center justify-center rounded-lg border border-yellow-400 mb-4 relative overflow-hidden">
                    {foodPhoto ? <img src={URL.createObjectURL(foodPhoto)} alt="Food" className='h-full w-full object-cover' /> : <span className="text-yellow-700">📸 อัพโหลดรูป</span>}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
                
                <textarea className="w-full p-3 border border-yellow-400 rounded-lg bg-yellow-50 mb-4" rows="4" placeholder="คำอธิบายสูตรอาหาร" value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}></textarea>
                
                <h2 className="text-xl font-bold text-yellow-800 mb-2">🥕 ส่วนผสม</h2>
                {ingredient.map((el, index) => (
                    <div key={el.id} className="flex items-center mb-2">
                        <input type="text" className="flex-1 p-3 border border-yellow-400 rounded-lg bg-yellow-50" placeholder={`ส่วนผสม ${index + 1}`} value={el.text} />
                    </div>
                ))}
                <button type="button" className="w-full p-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all" onClick={addIngredient}>+ เพิ่มส่วนผสม</button>
                
                <h2 className="text-xl font-bold text-yellow-800 mt-6 mb-2">👨‍🍳 วิธีทำ</h2>
                {procedure.map((el, index) => (
                    <div key={el.id} className="flex items-center mb-2">
                        <span className="w-8 h-8 bg-yellow-400 text-white flex items-center justify-center rounded-full mr-2">{index + 1}</span>
                        <input type='text' className="flex-1 p-3 border border-yellow-400 rounded-lg bg-yellow-50" placeholder={`ขั้นตอน ${index + 1}`} value={el.text} />
                    </div>
                ))}
                <button type="button" className="w-full p-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-all" onClick={addProcedure}>+ เพิ่มขั้นตอน</button>
                
                <h2 className="text-xl font-bold text-yellow-800 mt-6 mb-2">📌 เลือกหมวดหมู่</h2>
                <select className="w-full p-3 border border-yellow-400 rounded-lg bg-yellow-50" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">-- กรุณาเลือก --</option>
                    <option value="อาหารคาว">อาหารคาว</option>
                    <option value="ของหวาน">ของหวาน</option>
                    <option value="อาหารจานหลัก">อาหารจานหลัก</option>
                    <option value="อาหารทานเล่น">อาหารทานเล่น</option>
                    <option value="เครื่องดื่ม">เครื่องดื่ม</option>
                </select>
                {category && <p className="mt-2 text-yellow-700">✅ คุณเลือก: {category}</p>}
                
                <div className="flex justify-center mt-6">
                    <button type="submit" className="bg-yellow-600 text-white p-3 px-6 rounded-lg font-bold text-lg hover:bg-yellow-700 transition-all">🚀 เผยแพร่สูตรอาหาร</button>
                </div>
            </form>
        </div>
    );
}
