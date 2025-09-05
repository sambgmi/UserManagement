  import { createContext, useContext, useState, useCallback } from 'react';
import { userService } from '../services/api';
import { showToast } from '../utils/toast.jsx';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err);
      throw err; // Propagate the error for form handling
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(prev => prev.map(user => 
        user._id === id ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      showToast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
