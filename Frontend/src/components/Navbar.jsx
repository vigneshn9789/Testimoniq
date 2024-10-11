// // import React ,{useContext}from 'react'
// // import { Link ,useNavigate} from 'react-router-dom'
// // import { AuthContext } from './AuthContext'
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // function Navbar() {
  
// //     const { isAuthenticated,loading ,logoutUser} = useContext(AuthContext);  
  
// //     const navigate=useNavigate();

// //     const handleLogout = () => {
       
// //         axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/logout`)
// //           .then(() => {
// //             toast.success("LoggedOut successfully!",{   
// //               position: "top-center",
// //           });
// //           logoutUser();
// //             navigate("/login");
// //           })
// //           .catch((err) => {
// //             console.log("Logout Error: ", err);
// //           });
// //       };

// //   return (
// //     <section className="w-full px-8  text-gray-700 bg-white">
// //     <div className="container flex flex-col flex-wrap items-center justify-between py-2 mx-auto md:flex-row max-w-7xl">
// //         <div className="relative flex flex-col md:flex-row">
            // <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            //     <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">VTEST<span className="text-indigo-600">.</span></span>
            // </Link>
// //             <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
// //                 <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link>
                
// //                 <Link to="/aboutus" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">About Us</Link>
// //                 <Link to="/contactus" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Contact Us</Link>
// //                 {
// //                     isAuthenticated && <Link to="/dashboard" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Dashboard</Link>

// //                 }
// //             </nav>
// //         </div>
// // {
// //     isAuthenticated
// //     ?
// //      <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">

// //     <button onClick={handleLogout} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
// //         LogOut
// //     </button>
// // </div>
// // : 
// // <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
// // <Link to="/login" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
// //     Sign in
// // </Link>
// // <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
// //     Sign up
// // </Link>
// // </div>
// // }
        
       
// //     </div>
// // </section>

// //   )
// // }

// // export default Navbar



import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HiMenuAlt3 } from "react-icons/hi";



function Navbar() {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/logout`)
      .then(() => {
        toast.success("Logged Out successfully!",{ position: "top-center" });
        logoutUser();
        navigate("/login");
      })
      .catch((err) => {
        console.log("Logout Error: ", err);
      });
  };

  return (
    <nav className="w-full px-8  text-gray-700 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            
            <Link to="/" className="font-medium ">
                <span className="mx-auto text-2xl font-black leading-none text-gray-900 select-none">Testimoniq<span className="text-indigo-600">.</span></span>
            </Link>
          </div>

          {/* Menu for medium to large screens */}
          <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/aboutus" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">About Us</Link>
          <Link to="/contactus" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Contact Us</Link>
          {isAuthenticated && <Link to="/dashboard" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Dashboard</Link>}
       
          </div>

          {/* Login / Signup Buttons for medium to large screens */}
          <div className="hidden md:flex space-x-4">
           <div className="inline-flex items-center mt-4 md:mt-0 space-x-6 lg:justify-end">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              LogOut
            </button>
          ) : (
            <>
                <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
  Sign In
</Link>
<Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
  Sign Up
</Link>

            </>
          )}
        </div>
          </div>

          {/* Hamburger menu button for small screens */}
          <div className="flex   md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center bg-gray-200 justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500 focus:ring-white"
            >
           <HiMenuAlt3 color='black'/>
              

            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu  block px-3 py-2 mt-2 bg-gray-100 rounded-md text-base font-medium hover:bg-gray-300 */}
      {isOpen && (

        // className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        <div className="md:hidden  text-black         ">
          <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2  bg-gray-100 rounded-md text-base font-medium hover:bg-gray-300 ">Home</Link>
          <Link to="/aboutus" className="block px-3 py-2 mt-2 bg-gray-100 rounded-md text-base font-medium hover:bg-gray-300 ">About Us</Link>
          <Link to="/contactus" className="block px-3 py-2 mt-2 bg-gray-100 rounded-md text-base font-medium hover:bg-gray-300 ">Contact Us</Link>
          {isAuthenticated && <Link to="/dashboard" className="block px-3 py-2 mt-2 bg-gray-100 rounded-md text-base font-medium hover:bg-gray-300 ">Dashboard</Link>}
       
          <div className="inline-flex items-center mt-4 pt-3 space-x-6 justify-center">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              LogOut
            </button>
          ) : (
            <>
            <Link to="/login" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
  Sign In
</Link>
<Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
  Sign Up
</Link>

            </>
          )}
        </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


  
