
import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import ExportTestimonialsJSONButton from './ExportTestimonialsJSONButton';

function Testimonial({ pid }) {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const testimonialFetch = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/gettestimonial?pid=${pid}`);
      setTestimonials(response.data);

    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch Testimonial', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    testimonialFetch();
  }, []);

  const deleteTestimonial = (tid) => {
    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== tid));
  };

  return (
    // min-h-screen 
    <div className="mt-10 bg-gradient-to-r from-blue-50 to-blue-100">
      {/* <div className="text-center font-bold text-2xl my-6">View Testimonials</div> */}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      </div>
      ) : (
       
          testimonials.length > 0 ? (
           <>
          <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg gap-6 px-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial}  deleteTestimonial={deleteTestimonial}  />
            ))}
            </div>
             <ExportTestimonialsJSONButton pid={pid}/>
          </>
           
          ) : (
            <div className="flex justify-center pb-10 items-center">
            <h1 className="text-2xl font-semibold text-gray-700">No Testimonials Found</h1>
          </div>
          )
        
      )}
     
    </div>
  );
}

export default Testimonial;
