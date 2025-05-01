// import { create } from "zustand";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_BASE_URL;

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = API_URL;

// export const useAuthStore = create((set) => ({
//     user: null,
//     isAuthenticated: false,
//     error: null,
//     isCheckingAuth: true,

//   register: async (name, email, password) => {
//     try {
//         const res = await axios.post(`${API_URL}/api/users/register`, {name,email,password});
//         set({ user: res.data.user, isAuthenticated: true, error: null });
//         return res.data;
//     } catch (error) {
//         set({ error: error.response?.data || { message: "Registration failed" } || { message: "Something went wrong" } });
//         throw error;
//     }
//   },

//   login: async (email, password) => {
//     try {
//         const res = await axios.post(`${API_URL}/api/users/login`, {email, password});
//         set({ user: res.data.user, isAuthenticated: true, error: null });
//         return res.data;
//     } catch (error) {
//         set({ error: error.response?.data || { message: "Login failed" } });
//         throw error;
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post(`${API_URL}/api/users/logout`);
//       set({ user: null, isAuthenticated: false, error: null });
//     } catch (error) {
//       set({ error: error.response?.data || { message: "Logout failed" } });
//     }
//   },

//   checkAuth: async () => {
//     set({ isCheckingAuth: true, error: null });
//     try {
//       const response = await axios.get(`${API_URL}/api/users/check-auth`);
//       set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
//     } catch (error) {
//       set({ error: error.message, isCheckingAuth: false, isAuthenticated: false, user: null});
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },
    
// }));

import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
  isCheckingAuth: true,

  register: async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/register`, { name, email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, isAuthenticated: true, error: null });
      return res.data;
    } catch (error) {
      set({ error: error.response?.data || { message: "Registration failed" } });
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, isAuthenticated: true, error: null });
      return res.data;
    } catch (error) {
      set({ error: error.response?.data || { message: "Login failed" } });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/users/logout");
    } catch (error) {
      set({ error: error.response?.data || { message: "Logout failed" } });
    } finally {
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get("/api/users/check-auth");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({
        error: error.message,
        isCheckingAuth: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
}));
