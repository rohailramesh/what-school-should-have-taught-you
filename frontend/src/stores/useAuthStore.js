import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSignningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  error: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      toast.error("Failed to check auth");
    }
  },
  signup: async ({ name, email, password }) => {
    set({ isSignningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ authUser: res.data.user, isSignningUp: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Failed to signup");
      set({ isSignningUp: false });
    }
  },
  login: async ({ email, password }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ authUser: res.data.user, isLoggingIn: false });
      toast.success("Login successful");
    } catch (error) {
      toast.error("Failed to login");
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Failed to logout");
    }
  },
}));

export default useAuthStore;
