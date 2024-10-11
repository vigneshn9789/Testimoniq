import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

function ViewProductsPage() {
  
  const navigate = useNavigate();

    const [isLoading,setIsLoading]=useState(false);
    
    const [products,setProducts]=useState([]);
    const { user} = useContext(AuthContext);  
    const userId= user.id;

    const productFetch=async()=>{
        setIsLoading(true);
        try{
            // alert("userId being sent:"+ userId);

           const response=await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/viewproducts?userId=${userId}`);
           setProducts(response.data);
        }catch(error){
            console.log(error);
            toast.error("Failed to fetch products", { position: "top-center" });

        }finally{
           setIsLoading(false);
        }
    }
    useEffect(()=>{
        productFetch();
    },[])


    const handleView = (productId) => {
        // Handle the view logic (you could navigate to a product detail page, etc.)
        // console.log('View product with ID:', productId);
        // toast.info(" development InProgess", { position: "top-center" });
        navigate(`/productdetails/${productId}`)
      };

    const handleDeleteProduct=(productId)=>{
       setProducts(products.filter((product) => product.id !== productId));
         // toast.info(" development delete InProgess", { position: "top-center" });

    }
  

    return (
        <div className='min-h-screen p-3 bg-gradient-to-r pt-5 from-blue-50 to-blue-100 '>
        

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">View Products</h1>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-screen ">
            <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
          </div>
          ) 
          :
           (
              products.length > 0 ? (
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">

               { products.map((product, index) => (
                  <ProductCard
                    key={index}
                    pid={product.id}
                    name={product.name}
                    image={product.images[0]}
                    onView={() => handleView(product.id)}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                ))}
                 </div>
              ) 
              :
               (
           <>
             <h1 className="text-3xl mt-10 text-center font-semibold text-gray-700">No Products Found.</h1>

           </>
            
                )
           
          )}
        </div>
      );
}

export default ViewProductsPage