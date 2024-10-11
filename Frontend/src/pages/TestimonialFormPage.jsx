import React, { useState ,useEffect} from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import TestimonialForm from '../components/TestimonialForm';

function TestimonialFormPage() {
   
  const {pid}=useParams();
  const [product,setProduct]=useState([]);
  
  const [isLoading,setIsLoading]=useState(false);

  const productFetch=async()=>{
    setIsLoading(true);
   
  try{
      const response=await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/getproductforform?pid=${pid}`);
   
      setProduct(response.data);
  }catch(error){
     connsole.log(error);
     toast.error("Failed to fetch product",{position:'top-center'})
     
  }finally{
    setIsLoading(false);
  }
};
  useEffect(()=>{productFetch()},[])


  return (
    
    <div className='p-6 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100'>
      
      {
      isLoading?
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
        </div>
     :
     <div>{
        product.length==0
      ?
    
       <div className="flex justify-center pb-10 items-center">
       <h1 className="text-2xl font-semibold text-gray-700">No Products in the link</h1>
     </div>
      :
      <div>
         <Product product={product[0]} isFromForm={true}/>
         <TestimonialForm pid={pid}/>
      </div>
    }
     </div>
    
    }

    </div>

    
  );
}

export default TestimonialFormPage;
