import axios from 'axios';

// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for all requests
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export const STATIC_PATH = "http://localhost:5000/api/pdf/"

export default axiosInstance;