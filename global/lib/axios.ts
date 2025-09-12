// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com/api", // Replace with actual base URL
  withCredentials: true, // Optional, for cookies/sessions
});

// 🔐 Add auth token (if using JWT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Or from cookies/context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Global error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API error:", error.response || error.message);
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
