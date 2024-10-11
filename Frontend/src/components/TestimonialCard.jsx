

import React, { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { toPng } from 'html-to-image';
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';



function TestimonialCard({ testimonial, deleteTestimonial  }) {
  const { customer_name, customer_email, stars, review_text, image_url } = testimonial;
  const testimonialRef = useRef(null); // Reference to the testimonial card

  // Helper function to generate stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };


  const handleDelete=async ()=>{
    const confirmed = window.confirm(`Are you sure you want to delete the testimonial from ${customer_name}?`);
    if (confirmed) {
      try{
        const tid=testimonial.id;
       
        const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/deletetestimonial?tid=${tid}`);

        toast.success('Testimonial deleted', { position: 'top-center' });
        deleteTestimonial(tid);
      }catch(error){
        console.log(error);
        toast.error('Failed to delete Testimonial', { position: 'top-center' });

      }
      
    }
  }

  // Parse the image_url if it's a valid JSON string
  let images = [];
  try {
    images = JSON.parse(image_url);
  } catch (error) {
    console.error('Error parsing image URL:', error);
  }

  // Check if parsed images array exists and is not empty
  const imageExists = Array.isArray(images) && images.length > 0;

  const customArrowStyles =
    'absolute z-10 text-3xl bg-transparent transform -translate-y-1/2 transition duration-300';

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

  // Function to download testimonial as an image
  const downloadAsImage = () => {
    if (testimonialRef.current === null) return;

    toPng(testimonialRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${customer_name}_testimonial.png`;
        link.href = dataUrl;
        link.click();
        toast.success('Testimonial Image downloaded Successfully!!!', { position: 'top-center' });

      })
      .catch((error) => {
        console.error('Could not export testimonial as image', error);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 break-inside-avoid text-center flex flex-col items-center space-y-4">
      <div ref={testimonialRef} className="w-full">
        {/* Customer Name */}
        <h2 className="text-xl pb-2 font-semibold text-gray-800">{customer_name}</h2>

        {/* Customer Email */}
        <p className=" pb-2 text-gray-500">{customer_email}</p>

        {/* Stars */}
        <div className=" pb-2 flex justify-center">{renderStars(stars)}</div>

        {/* Review Text */}
        <p className=" pb-2 text-gray-600 italic">"{review_text}"</p>

        {/* Testimonial Image - Only render if it exists */}
        {imageExists && (
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
              {images.map((image, index) => (
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
      </div>

      {/* Button to Download as Image */}
      <div className="w-full flex justify-end space-x-2"> 

      <button
      onClick={downloadAsImage}
      className=" text-white px-4 py-2 rounded-lg  hover:bg-blue-300 flex items-center justify-center"
    >
     <FaDownload color='gray'/>

    </button>

    <button
      onClick={handleDelete}
      className=" text-white px-4 py-2 rounded-lg  hover:bg-red-400 flex items-center justify-center"
    >
     <MdDelete color='gray'/>

    </button>
</div>
    </div>
  );
}

export default TestimonialCard;
