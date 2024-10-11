import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

import QRCodeGenerator from '../components/QRCodeGenerator';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Product({ product,isFromForm=false }) {
  
  if (!product) {
    return <div>No product data available</div>;
  }

  const [isCopied, setIsCopied] = useState(false);
  const productLink = `${import.meta.env.VITE_APP_FRONTEND_URL}/add-testimonial/${product.id}`;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(productLink);
    setIsCopied(true);
    toast.success("Link copied to clipboard!", { position: "top-center" });

    setTimeout(() => setIsCopied(false), 3000);
  };

  // Custom arrow styles for carousel
  const customArrowStyles = 
  'absolute z-10 text-3xl  bg-transparent  transform -translate-y-1/2 transition duration-300';


  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className={`${customArrowStyles} left-0`}
        style={{ top: '50%' }} // Center vertically
      >
        &#171;
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className={`${customArrowStyles} right-0`}
        style={{ top: '50%' }} // Center vertically
      >
        &#187;
      </button>
    );

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
      {/* Banner for Title and Description */}
   {
     isFromForm &&  <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Submit Your Testimonial</h1>


   }
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-blue-600">{product.name}</h1>
        <p className="mt-2 text-justify text-gray-700">{product.description}</p>
      </div>

      {/* Image Carousel */}
      {product.images && product.images.length > 0 && (
        <div className="mb-6 p-8">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            dynamicHeight={true}
            renderArrowPrev={renderArrowPrev}  // Custom left arrow
            renderArrowNext={renderArrowNext}  // Custom right arrow
          >
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="rounded-lg max-w-full h-auto max-h-80 object-contain mx-auto"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Link Section */}
      {
            !isFromForm &&  <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Share this product with your customers:</h2>
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={productLink}
                readOnly
                className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-center"
              />
              <button
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg transform transition-transform duration-200 hover:bg-green-600 active:bg-green-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                onClick={copyLinkToClipboard}
              >
                {isCopied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
            <QRCodeGenerator link={productLink}/>
          </div>
      }
    
    </div>
  );
}

export default Product;
