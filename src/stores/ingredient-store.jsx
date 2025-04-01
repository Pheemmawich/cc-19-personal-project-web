import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from "zustand/middleware";
import { createAlert } from "../utils/createAlert";

//Step 1 Create Store
const ingredientStore =(set) => ({
    ingredients: [],
    actionSetIngredient: (value) => {
        set({ ingredients: value})
    },
})

//Step 2 Exports Store
const useIngredientStore =create(persist(ingredientStore,{name: 'ingredient-store'}))

export default useIngredientStore;