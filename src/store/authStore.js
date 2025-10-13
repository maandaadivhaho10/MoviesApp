import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const res = await axios.post(
        "https://movieauthbackend.onrender.com/api/auth/login",
        { email, password }
      );

      const { token, user } = res.data;

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Update store
      set({ user, token, isAuthenticated: true });

      // Optionally set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await axios.post(
        "https://movieauthbackend.onrender.com/api/auth/register",
        { name, email, password }
      );
      console.log("Registered:", res.data);
      return res.data;
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });

    // Remove Authorization header for future requests
    delete axios.defaults.headers.common["Authorization"];
  },
}));
