import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'



// const json = {
//     name:"jfuydjuy",
//     ingredient:[]
// }

function RecipeData() {

const[recipe,setRecipe]=useState({
    id:'',
    name:'',
    foodImage: null,
    description: '',
    method:[],
    ingredient:[],
    category:'',
    firstname:'',
    lastname:''
})

const {id}= useParams()
console.log(id);

const getData = async () => {
    const data = await axios.get(`http://localhost:8000/api/recipes/${id}`)
    const ingredient = JSON.parse(data.data.recipe.ingredient)
    const method = JSON.parse(data.data.recipe.method)
    const {name, foodImage, description, category } = data.data.recipe
    const {firstname, lastname} = data.data.recipe.user
   
    console.log('data.data.ingredient :>> ', data.data.recipe.ingredient);
    console.log("---------------------------------", data.data)
    console.log("ingredient------", ingredient)
    console.log("name------", name)
    console.log("method------", method)
    console.log("foodImage------", foodImage)
    console.log("description------", description)
    console.log("category------", category)
    console.log("firstname------", firstname)
    console.log("lastname------", lastname)
    console.log("id------", id)
    
    setRecipe(pre => ({...pre, id, name, foodImage, description, method, ingredient, category : category.name, firstname, lastname}))
}
console.log('recipeeeeeeeeeeeeeeeeeeeeeeee',recipe);


useEffect(() => {
    getData()
},[])



  return (
    <div className="w-4xl mx-auto bg-gradient-to-br from-yellow-500 to-white rounded-lg overflow-hidden shadow-lg mt-10">
        <div >
            <img
            src= {recipe.foodImage}
            alt="A plate of omelette topped with ham and cheese"
            className="w-full"
            />
        </div>
        <div >
        <h1 className="text-xl font-bold mb-2">{recipe.name}</h1>
        <p className="text-sm text-gray-700 mb-2">by</p>
        <div className="flex items-center mb-4">
            <img
            src=""
            alt="Profile picture of Andy Bobby"
            className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-bold">{recipe.firstname} {recipe.lastname}</span>
        </div>
        <p className="font-bold mb-2">description</p>
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <div className="flex justify-between mb-4">
            <button className="bg-white text-black font-bold py-2 px-4 rounded">like</button>
            <button className="bg-white text-black font-bold py-2 px-4 rounded">comment</button>
            <button className="bg-white text-black font-bold py-2 px-4 rounded">save</button>
        </div>
        <p className="font-bold mb-2">ส่วนผสม</p>
        <div className="flex flex-col justify-between mb-2">
            {recipe.ingredient.map(el => <div>
                <span className='mx-4'>{el.id}</span>
                <span>{"         "}</span>
                <span >{el.text}</span>
            </div>  )}
            
        </div>
        <h2>วิธีทำ</h2>
        {recipe.method.map(el => <div>
                <span className='mx-4'>{el.id}</span>
                <span>{"         "}</span>
                <span >{el.text}</span>
            </div>  )}
        
        </div>
    </div>
  )
}

export default RecipeData