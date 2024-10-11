import React  ,{useState,useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreateProductPage() {
const navigate=useNavigate();
  const [productName, setProductName] = useState('');
  // const [productId, setProductId] = useState('');

  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user} = useContext(AuthContext);  


  // Handle image selection
  const handleImageChange = (e) => {
    setImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!productName || !description || images.length === 0) {
      // alert('Please fill in all fields and select at least one image.');
      toast.info("Please fill in all fields and select at least one image.",{position: "top-center",});

      return;
    }

    const formData = new  FormData();
    formData.append('productName', productName);
    // formData.append('productId', productId);

    formData.append('description', description);
    formData.append('user_id', user.id);
    // alert(user.id);


    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    // toast.success("User Id : {user.id}",{position: "top-center",});

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/createproducts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // alert('Product created successfully!');
      toast.success("Product created successfully!",{position: "top-center",});
     
      console.log('Product ID:', response.data.productId);
      // Optionally, redirect to the product detail page
      // e.g., history.push(`/products/${response.data.productId}`);
      // Reset form
      setProductName('');
      // setProductId('');

      setDescription('');
      setImages([]);

      navigate(`/productdetails/${response.data.productId}`)
    } catch (error) {
      console.error('Error creating product:', error);
      // alert('Failed to create product.');
      toast.error("Failed to create product!",{position: "top-center",});

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center items-center">
              <h1 className="mt-3 text-4xl font-bold text-center text-gray-800 mb-10">Create a New Product</h1>

      <div className="w-full max-w-2xl p-8 bg-white shadow-xl rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter the product name"
              required
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="productName">
              Product Id
            </label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}

              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Enter the unique product id "
              required
            />
          </div> */}

          {/* Product Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="productDescription">
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              rows="5"
              placeholder="Write a detailed product description"
              required
            ></textarea>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="productImage">
              Product Image
            </label>
            <input
  type="file"


  multiple 
  onChange={handleImageChange} 
  accept="image/*"
  id="productImage"
  className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-50 cursor-pointer transition duration-300"
  required
/>

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;
