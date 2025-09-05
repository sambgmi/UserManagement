import axios from 'axios';
import { showToast } from '../utils/toast.jsx';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// Error interceptor
api.interceptors.response.use(
  (response) => {
    // Show success toast for create, update, and delete operations
    if (response.config.method !== 'get') {
      const method = response.config.method.toLowerCase();
      let message = '';
      
      switch (method) {
        case 'post':
          message = 'User created successfully!';
          break;
        case 'put':
          message = 'User updated successfully!';
          break;
        case 'delete':
          message = 'User deleted successfully!';
          break;
        default:
          return response;
      }
      
      showToast.success(message);
    }
    return response;
  },
  (error) => {
    // Get the error message from the response or use a default
    let errorMessage;
    
    if (error.response && error.response.data) {
      // Use backend error message if available
      errorMessage = error.response.data.message;
      
      // Show toast for the error
      showToast.error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error. Please check your connection.';
      showToast.error(errorMessage);
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Something happened in setting up the request
      errorMessage = 'An error occurred while processing your request.';
      showToast.error(errorMessage);
    }
    
    // Reject the promise with the error message
    return Promise.reject(errorMessage);
  }
);
