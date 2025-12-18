import axios from 'axios';

const API_BASE_URL = 'https://your-api-domain.com'; // Replace with your backend API URL

// Signup API
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Login API
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
