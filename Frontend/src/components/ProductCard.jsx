import React from 'react';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductCard = ({pid, name, image, onView ,handleDeleteProduct}) => {

  const handleDelete=async ()=>{
    const confirmed = window.confirm(`Are you sure you want to delete the product : ${name}?`);
    if (confirmed) {
      try{

        const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/deleteproduct?pid=${pid}`);

        toast.success('Product deleted', { position: 'top-center' });
//callback send to update
        handleDeleteProduct(pid);

      }catch(error){
        console.log(error);
        toast.error('Failed to delete Product', { position: 'top-center' });

      }
      
    }
  }

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 border border-gray-200">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="px-6 py-4 bg-white">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
       
        <div className="w-full flex justify-between space-x-2"> 

        <button 
          onClick={onView}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View
        </button>

    <button
      onClick={handleDelete}
      className=" text-white px-4 py-2 rounded-lg  hover:bg-red-400 flex items-center justify-center"
    >
     <MdDelete color='gray' size={24}/>

    </button>
</div>
      </div>
    </div>
  );
};

export default ProductCard;
