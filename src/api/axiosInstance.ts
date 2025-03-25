import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8090/api", // Replace with your base URL
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json", // Set the Content-Type
  },
});

export default axiosInstance;
