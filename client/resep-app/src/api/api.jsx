// src/api/api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.2:3000/", // Ganti dengan base URL API kamu
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
