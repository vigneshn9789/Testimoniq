
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status
  const [user, setUser] = useState(null); // Stores user information
  const [loading, setLoading] = useState(true); // Handles loading state

  // Configure Axios to send credentials with every request
  axios.defaults.withCredentials = true;

  // Function to check authentication status on app load
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/dashboard`); 
      if (response.data.Status === 'Success') {
        setIsAuthenticated(true);
        setUser({ name: response.data.name , id:response.data.id}); 
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  // Function to handle login
  const loginUser = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle logout
  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
