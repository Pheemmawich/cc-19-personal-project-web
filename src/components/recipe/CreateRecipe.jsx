import axios from 'axios'
import React, { useState } from 'react'
import { createAlert } from '../../utils/createAlert'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import Buttons from '../../components/form/Buttons'
import { actionRegister } from '../../api/auth'

function CreateRecipe() {
    const [ingredient, setIngredient] = useState([
        {id: 1, text:"" },
        {id: 2, text: ""},
        {id: 3, text: ""},
      ])
    
    const [procedure, setProcedure] = useState([
        {id: 1, text:"" },
        {id: 2, text: ""},
        {id: 3, text: ""},
    ])

    const {register, handleSubmit, formState, reset} = useForm()
    const { isSubmitting, errors} = formState

    const hdlOnChange = (e,id) => {

        console.log("object,",id);
        setIngredient(prev => prev.map( el => el.id !== id ? el : {...el, text: e.target.value}))
    }

    const hdlOnSubmit = async (value) => {
        // e.preventDefault()
    
        // Delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
    
        try {
          const res = await actionRegister(value)
          // setValue(initialValue)
          createAlert('success', 'recipe post success')
          reset()
          console.log(res);
        } catch (error) {
        //   createAlert('info', error.response?.data?.message)
        //   console.log(error.response?.data?.message);
        console.log(error);
        }
      }

    

    const addIngredient = () => setIngredient(pre=>[...pre, 
        {
          id: pre.length >0 ? pre[pre.length-1].id+1 : 1,
          text:""
         }
      ])

    const hdlDelIngredient = (id) => {
        // console.log("iddd",id);
        setIngredient(pre=>{
            if(pre.length > 1){
                return pre.filter(el=> el.id !== id)
            }else{
            return pre
            }
            }
        )
    }

    const addProcedure = () => setProcedure(pre => [...pre,{ id: pre.length >0 ? pre[pre.length-1].id+1 : 1,
    text:""}])

    const hdlDelProcedure = () => {
        setProcedure(pre => pre.length>1 ?[...pre.slice(0, -1)] : pre);
    }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md">
        <h1 className="text-lg font-bold mb-4">เขียนสูตรอาหาร</h1>
        
        <form onSubmit={handleSubmit(hdlOnSubmit)}>
            <div className="mb-4">
                <input type="text"  className="w-full bg-gray-300 p-2" placeholder="=ชื่อสูตร" {...register("name")}/>
            </div>
            <div className="mb-4">
                <div className="bg-gray-300 h-48 flex items-center justify-center">
                    <i className="fas fa-camera text-2xl"></i>
                    <span className="ml-2">อัพโหลดรูปอาหาร</span>
                </div>
            </div>
  
            <div className="mb-4">
                <textarea className="w-full bg-gray-300 p-2" rows="4" placeholder="description" {...register("description")}></textarea>
            </div>
            
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">ส่วนผสม</h2>
                {ingredient?.map((el,index)=>{
                    return<>
                    <div className="flex items-center mb-2">
                    <input value={el.text}  onChange={(e)=> hdlOnChange(e,el.id)} name={el.id} type="text" className="flex-1 bg-gray-300 p-2" placeholder={"ส่วนผสม"} />
                    <button onClick={()=>hdlDelIngredient(el.id)} type="button" className="ml-2 text-xl text-black">&times;</button>
                </div>
                </>
                })}
                <button type="button" className="w-full bg-gray-300 p-2"
                onClick={addIngredient}
                >+ Add</button>
            </div>
           
            <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">วิธีการทำ</h2>
            {
                procedure.map((el) => {
                    return <div className="mb-2">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gray-300 flex items-center justify-center mr-2">{el.id}</div>
                        <input type= 'text' className="flex-1 bg-gray-300 p-2" placeholder={"ขั้นตอน"}/>
                        <button onClick={hdlDelProcedure} type="button" className="ml-2 text-xl text-black">&times;</button>
                    </div>
                </div>
                })
            }
                
                <button onClick={addProcedure} type="button" className="w-full bg-gray-300 p-2">+ Add</button>
            </div>

            <div className="flex justify-between mt-4">
                <button type="button" className="bg-gray-300 p-2">ลบ</button>
                <button type="button" className="bg-gray-300 p-2">บันทึกฉบับร่าง</button>
                <button type="button" className="bg-gray-300 p-2">แชร์</button>
            </div>
            
            <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default CreateRecipe