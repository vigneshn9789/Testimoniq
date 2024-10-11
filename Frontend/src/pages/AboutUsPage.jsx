import React from 'react';
import { FaLinkedin } from "react-icons/fa";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100  flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h1>

        {/* Intro Section */}
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            Welcome to Our Testimonial Collection Platform
          </h2>
          <p className="text-gray-600 text-justify leading-relaxed text-center mb-6">
            We are dedicated to providing a seamless way for businesses to collect and showcase testimonials from their customers. Our platform makes it easy for you to create products, share testimonial links, and gather valuable feedback from your clients. Whether you’re a small business or a large enterprise, we’ve built a solution that allows you to showcase your reputation and build trust with new customers.
          </p>
        </div>

      
        {/* Our Mission Section */}
        <div className="mt-16 bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Our Mission</h2>
          <p className="text-gray-600 text-justify leading-relaxed text-center">
            Our mission is to empower businesses by providing a simple, efficient platform for collecting authentic customer testimonials. We believe that honest customer feedback is the cornerstone of building trust and credibility with new customers. Our solution helps businesses grow by putting their customers’ voices front and center.
          </p>
        </div>

        {/* About the Developer Section */}
        <div className="mt-12 bg-white p-8 shadow-xl rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">About the Developer</h2>
          <div className="flex flex-col items-center">
            {/* Developer Image (Optional) */}
            <img
              src="/Vignesh02.jpg" // Replace with your actual image path
              alt="Developer"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">VIGNESH N</h3>
            <p className="text-gray-600">MCA Student at M.Kumarasamy College of Engineering, Karur</p>
            <p className="text-gray-600 text-justify mt-4 text-center">
              I am the sole developer of this testimonial-collecting web application. Currently pursuing my Master of Computer Applications (MCA) at M.Kumarasamy College of Engineering in Karur, I have developed this project to help businesses efficiently gather and manage customer testimonials. This platform leverages the power of React, Express, and MySQL to deliver a robust and user-friendly experience.
            </p>
            {/* Optional: Add links to your LinkedIn etc. */}
            <div className="mt-4 flex space-x-4">
              <a href="https://linkedin.com/in/vigneshn97" target="_blank" rel="noopener noreferrer" className="text-blue-500 ">
              <FaLinkedin className="text-blue-500 hover:text-blue-700" size={30}/>
              </a>
              {/* Add more links as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
