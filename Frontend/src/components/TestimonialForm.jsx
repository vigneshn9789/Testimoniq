import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function TestimonialForm({pid}) {

    const [isSubmitting, setIsSubmitting] = useState(false);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  
 

  const handleImageChange = (e) => {
    setImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productId', pid);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('stars', stars);
    formData.append('review', review);
    
    // Append images to formData
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
 setIsSubmitting(true);
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/addtestimonial`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message, { position: 'top-center' });
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setStars(0);
      setReview('');
      setImages([]);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.error || 'Failed to submit testimonial';
      toast.error(errorMessage, { position: 'top-center' });
    }finally{
        setIsSubmitting(false);
    }
  };

  return (
<>

<div className="min-h-screen m-6 flex justify-center items-center">
      <div className="w-full max-w-2xl p-8  bg-gray-100 shadow-md rounded-lg">
        {/* <h1 className="text-3xl font-semibold text-center mb-6">Submit Your Testimonial</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Star Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star} className="cursor-pointer">
                  <input
                    required
                    type="radio"
                    value={star}
                    checked={stars === star}
                    onChange={() => setStars(star)}
                    className="hidden"
                    
                  />
                  <span className={`text-2xl ${stars >= star ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="review">
              Your Testimonial
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="images">
              Upload Images (optional)
            </label>
            <input
              type="file"
              id="images"
              onChange={handleImageChange}
              multiple
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}

          </button>
        </form>
      </div>
    </div>
</>
  )
}

export default TestimonialForm