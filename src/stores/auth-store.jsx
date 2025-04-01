import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from "zustand/middleware";
import { createAlert } from "../utils/createAlert";

//Step 1 Create Store
const authStore = (set) => ({
  user: {},
  token: null,
  actionLoginWithZustand: async (value) => {
    try {
      const res = await actionLogin(value);
      // console.log('Hello,Zustanddd',res);
      const { user, token } = res.data;
      console.log(user.role);
      console.log(token);
      set({ user, token });
      return { success: true, role: user.role };
    } catch (error) {
      console.log(error.response?.data?.message);
      createAlert("info", "Something Wrong!!!");
      return { success: false, error: error.response.data.message };
    }
  },
  actionLogout: () => {
    set({ user: [], token: null });
  },
});

//Step 2 Exports Store
const useAuthStore = create(persist(authStore, { name: "auth-store" }));

export default useAuthStore;
