import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken"),

  login: (token) => {
    localStorage.setItem("authToken", token);
    set({ isAuthenticated: true, token:token });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;
