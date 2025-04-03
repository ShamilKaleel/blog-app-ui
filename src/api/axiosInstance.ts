import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: url, // Replace with your base URL
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json", // Set the Content-Type
  },
});

// Add a response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle auth errors - 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Clear local storage if we get an auth error
      localStorage.removeItem("user");
      
      // Optionally redirect to login page
      // If you want to redirect, you need to handle it here or in a component
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;