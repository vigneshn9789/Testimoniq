import React from 'react'
import { Routes,createBrowserRouter,createRoutesFromElements,RouterProvider, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainLayout from './layouts/MainLayout';
import SignUpPage from './pages/SignUpPage';
import InProgressPage from './pages/InProgressPage';
import DashboardPage from './pages/DashboardPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CreateProductPage from './pages/CreateProductPage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import ViewProductsPage from './pages/ViewProductsPage';
import TestimonialFormPage from './pages/TestimonialFormPage';


const router= createBrowserRouter(createRoutesFromElements(
 <Route  path='/' element= {<MainLayout/>}>
  <Route  path='/' element= {<HomePage/>}/>
<Route path='/login' element= {<LoginPage/>}/>
<Route path='/signup' element ={<SignUpPage/>}/>
<Route path='/contactus' element ={<ContactUsPage/>}/>
<Route path='/aboutus' element ={<AboutUsPage/>}/>


<Route path='*' element={<InProgressPage/>}/>

<Route path='/add-testimonial/:pid' element ={<TestimonialFormPage/>}/>

    <Route path="/productdetails/:pid" element={
      <ProtectedRoute>
        <ProductDetailsPage />
      </ProtectedRoute>
    } />
   <Route path="/create-product" element={
      <ProtectedRoute>
        <CreateProductPage/>
      </ProtectedRoute>
    } />
     <Route path="/existing-products" element={
      <ProtectedRoute>
        <ViewProductsPage/>
      </ProtectedRoute>
    } />
   

<Route path='/dashboard' element={<DashboardPage/>}/>
 </Route>



 ));
function App() {
  return <>
   <ToastContainer />
  <RouterProvider router={router}/>
  </>
}

export default App