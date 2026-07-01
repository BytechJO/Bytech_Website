import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("API_BASE_URL:", API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
