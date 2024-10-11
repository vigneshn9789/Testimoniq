import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ContactUsPage() {
  const [data,setdata]=useState({
    name:"",
    email:"", 
    subject:"",
    message:""
  });

  const handleSubmit=(event)=>{

   event.preventDefault();

    axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/usermessage`,data)
    .then((res)=>{

      if(res.data.Status==="Success"){
        toast.success("message posted!",{
          
            position: "top-center",
        });

        setdata({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
      }
      
    })
    .catch((err)=>{

       toast.error("please try again.",{
            
        position: "top-center",
    });
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100  flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={e=>{setdata({...data ,name :e.target.value})}}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={e=>{setdata({...data ,email :e.target.value})}}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={data.subject}
                  onChange={e=>{setdata({...data ,subject :e.target.value})}}

                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Subject"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={data.message}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="6"
                  onChange={e=>{setdata({...data ,message :e.target.value})}}

                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Contact Information</h2>
            <p className="text-gray-600 mb-6">
              Feel free to contact us via email or phone. We are here to help you 24/7.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 8.09V7A2 2 0 0 0 19 5h-2a2 2 0 0 0-2 2v1H9V7A2 2 0 0 0 7 5H5A2 2 0 0 0 3 7v1.09C3 12.42 6.42 15 10.14 16.66L11 17a1.18 1.18 0 0 1 0 2.16L8.41 22a1.18 1.18 0 0 0 .58 2.18c2.36 0 4.72-.66 6.86-1.89A12.12 12.12 0 0 0 21 8.09z" />
                </svg>
                <span className="text-gray-700 font-medium">Phone: 1234567890</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11a2.5 2.5 0 0 0-2.5-2.5h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20zM20 6.5a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h15z" />
                </svg>
                <span className="text-gray-700 font-medium">Email: contact@vtest.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25C6.48 2.25 2.25 6.48 2.25 12S6.48 21.75 12 21.75 21.75 17.52 21.75 12 17.52 2.25 12 2.25zm0 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-12a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 8.25zm0 4.75h-.75a.75.75 0 0 0-.75.75v3.75h3v-3.75a.75.75 0 0 0-.75-.75H12z" />
                </svg>
                <span className="text-gray-700 font-medium">Address: karur</span>
              </div>
            </div>

            {/* <div className="mt-8">
              <iframe
                className="w-full h-48 rounded-lg shadow-sm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509407!2d144.9559283153166!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577681738f2c3e5!2sVictoria!5e0!3m2!1sen!2sau!4v1591232172109!5m2!1sen!2sau"
                frameBorder="0"
                aria-hidden="false"
                tabIndex="0"
                title="Map"
              ></iframe>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
