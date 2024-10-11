// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate ,useNavigate} from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
   const navigate=useNavigate();
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
  
   return <Navigate to="/login" replace />;
   
  }

  return children;
};

export default ProtectedRoute;
