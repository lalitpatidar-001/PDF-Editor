import axios from 'axios';


// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
  baseURL: 'https://pdf-editor-j9cy.onrender.com/api', // Base URL for all requests
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export const STATIC_PATH = "https://pdf-editor-j9cy.onrender.com/api/pdf/"

export default axiosInstance;