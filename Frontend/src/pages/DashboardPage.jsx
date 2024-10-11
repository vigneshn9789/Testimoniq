import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../components/AuthContext';

function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated,loading ,user,logoutUser} = useContext(AuthContext);  
var username="user Name";
var userId="user Id";
if(isAuthenticated){
  username=user.name;
  userId=user.id;
}

  return (<>
        {isAuthenticated ? (
          //min-h-screen 
          <div className=" min-h-screen bg-gradient-to-r from-blue-50 to-blue-100  ">
            <h1 className="pt-10 text-4xl font-bold text-center text-gray-800 mb-10">Dashboard</h1>

            <div className="flex justify-center items-center px-4 pb-12">

        <div className="w-full max-w-3xl  p-6 bg-white shadow-md rounded-lg flex flex-col justify-center  items-center">
            <h1 className="text-2xl font-medium text-gray-700 text-center mb-6">Welcome {username}</h1>
       
     
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create a New Product Card */}
              <div className="p-6 bg-gray-200 shadow-md rounded-lg text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Product</h3>
                <p className="text-gray-600 text-justify mb-6">
                  Start by adding details for your new product, including name, description, and images.
                </p>
                <button 
                  onClick={() => navigate("/create-product")} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Create
                </button>
              </div>
        
              {/* Existing Products Card */}
              <div className="p-6 bg-gray-200 shadow-md rounded-lg text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Products</h3>
                <p className="text-gray-600 text-justify mb-6">
                  View and manage your existing products, or check collected testimonials.
                </p>
                <button 
                  onClick={() => navigate("/existing-products")} 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  View
                </button>
              </div>
            </div>
          </div>
    
      </div>

        </div>
        
        ) : (

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700">Unauthorized User</h2>
            <button 
              onClick={() => navigate("/login")} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </div>
      
      </div>
    </div>
    )}
    </>
  );
}

export default DashboardPage;
