// axiosConfig.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST; // Replace with your backend URL

console.log(process.env.REACT_APP_API_HOST)
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  }
});

export default axiosInstance;
