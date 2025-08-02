// frontend/src/utils/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // make sure backend runs here
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using sessions/cookies
});

export default axiosInstance;
