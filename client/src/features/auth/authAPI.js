// src/features/auth/authAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// users
export const getAllUsers = async () => {
  const response = await axios.get("http://localhost:5000/api/auth/users");
  // const response = await axios.get(`${API_URL}/users`, userData);
  return response.data;
};

// ✅ Get user by ID with token
export const getUserById = async (userId, token) => {
  const response = await axios.get(
    `http://localhost:5000/api/auth/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
