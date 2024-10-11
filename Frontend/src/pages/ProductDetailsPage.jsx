import React ,{useContext,useState,useEffect}from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'
import Product from '../components/Product'
import Testimonial from '../components/Testimonial'
import { toast } from 'react-toastify';
import axios from 'axios'


function ProductDetailsPage() {
 const {pid}=useParams();

  const { user } = useContext(AuthContext);  
  const userId=user.id;
  
  const [isLoading,setIsLoading]=useState(false);
  const [product,setProduct]=useState([]);


    const productFetch=async()=>{
      setIsLoading(true);
      try{
           
      
         const response=await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/getproduct?userId=${userId}&pid=${pid}`);
         
         setProduct(response.data);
         
      }catch(error){
          console.log(error);
          toast.error("Failed to fetch product", { position: "top-center" });

      }finally{
         setIsLoading(false);
      }
  }
  useEffect(()=>{
      productFetch();
  },[])
 

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen ">
          <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
        </div>
      ) : (
        //  px-4 py-10
        <div className=" min-h-screen bg-gradient-to-r from-blue-50 to-blue-100  mx-auto">
          {product.length === 0 ? (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <h1 className="text-2xl font-semibold text-gray-700">No products found for this product ID.</h1>
            </div>
          ) : (
            <div className="shadow-lg rounded-lg p-6">
              
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Product Details</h1>

              <Product product={product[0]} />
             
              <h1 className="text-4xl font-bold pt-20 text-center text-gray-800 ">Customer Testimonials</h1>

              <Testimonial pid={pid} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductDetailsPage