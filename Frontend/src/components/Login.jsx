import React ,{useContext, useState} from 'react'

import { FaFaceSmileWink } from "react-icons/fa6";
import{ useNavigate , Link} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
function Login() {

  const [value,setvalue] = useState({
    email:"",
    password:"",
  })

   const navigate=useNavigate();
   axios.defaults.withCredentials=true;
   const { loginUser } =useContext(AuthContext);

  const handleSubmit=(event)=>{

   event.preventDefault();

    axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`,value)
    .then(res => {

      if(res.data.Status==="Success"){

        toast.success("Successfully Signed In",{position: "top-center",});
    
      axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/dashboard`)
       .then((res)=>{
        if (res.data.Status === "Success") {
         loginUser({ name: res.data.name ,id:res.data.id}); 
          //  alert(res.data.name);
          navigate('/dashboard');
        } else {
          toast.error("Failed to fetch user data.", { position: "top-center" });
        }
       })
       .catch((err) => {
        toast.error("An error occurred while fetching token data.", { position: "top-center" });
        console.error("Error fetching token data:", err);
      });
      }
      else if (res.data.Error) {
        // Handle specific error messages from the backend
        toast.error(res.data.Error, { position: "top-center" });
      }
   
    })
    .catch((err) => {
      if (err.response) {
        // Handle error response from the server
        if (err.response.status === 400) {
          toast.error(err.response.data.Error || "Invalid credentials", { position: "top-center" });
        }
      } else if (err.request) {
        // Network or server error (when backend is not available)
        toast.error("Our services are currently paused by Vignesh for maintenance. Please contact Vignesh for further information.", {
          duration: 5000,
          position: "top-center",
        });
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.", { position: "top-center" });
      }

      console.error("Error login user:", err);
    });

  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-blue-100">
     
    <div className="w-full max-w-xs m-auto bg-gray-200 rounded p-5">   
   
          <header>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Sign In</h1>
            {/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
          </header>   
          <form onSubmit={handleSubmit}>
          <div>
              <label className="block mb-2 text-indigo-500" htmlFor="email">Email Id</label>
              <input onChange={e=> setvalue({...value,email: e.target.value})}  required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="EmailId"/>
            </div>

            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
              <input onChange={e=> setvalue({...value,password: e.target.value})} required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password"  name="password"/>
            </div>
            <div>          
              <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" value={"Sign In"} type="submit"/>
            </div>       
          </form>  
          <footer>
            {/* <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a> */}
            <Link className="text-indigo-700 hover:text-pink-700 text-sm float-right " to="/signup" >Create Account</Link>
          </footer>   
        </div>
    </div>
  )
}

export default Login