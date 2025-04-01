import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from "zustand/middleware";
import { createAlert } from "../utils/createAlert";

//Step 1 Create Store
const likeStore =(set) => ({
    likes: [],
    actionSetLike: (value) => {
        set({ likes: value})
    },
})

//Step 2 Exports Store
const useLikeStore =create(persist(likeStore,{name: 'ingredient-store'}))

export default useLikeStore;