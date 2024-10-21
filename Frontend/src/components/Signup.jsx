import React, {useState}from 'react'
import{ useNavigate , Link} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
function Signup() {

    const [value,setvalue] = useState({
      name:"",
      email:"",
      password:"",
    })
     const navigate=useNavigate();

    const handleSubmit=(event)=>{

     event.preventDefault();

      axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/signup`,value)
      .then(res => {
     
        if(res.data.Status==="Success"){
          toast.success("Signup successful!",{
            
              position: "top-center",
          });
          navigate('/login')
        }
     
      })

      .catch(err => {
        if (err.response) {
          // Handle error response from backend
          if (err.response.status === 400) {
            toast.error("EmailId already exists.", {
              position: "top-center",
            });
          }
        } 
         if (err.request) {
          // Network error or backend unavailable
          toast.error("Our services are currently paused by Vignesh for maintenance. Please contact Vignesh for further information.", {
            duration: 5000,
            position: "top-center",
          });
        } else {
          // Other errors
          toast.error("An unexpected error occurred. Please try again.", {
            position: "top-center",
          });
        }
        console.error("Error registering user:", err);
      });
    };

  return (
    <div className="flex h-screen   bg-gradient-to-r from-blue-50 to-blue-100">
    <div className="w-full max-w-xs m-auto bg-gray-200 rounded p-5">   
          <header>
            {/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Sign Up</h1>
                      </header>   
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="username">Username</label>
              <input onChange={e=> setvalue({...value,name: e.target.value})} required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="username"/>
            </div>

            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="username">Email Id</label>
              <input onChange={e=> setvalue({...value,email: e.target.value})}  required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="EmailId"/>
            </div>

            <div>
              <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
              <input onChange={e=> setvalue({...value,password: e.target.value})} required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password"  name="password"/>
            </div>
            <div>          
              <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" value="Sign Up" type="submit"/>
            </div>       
          </form>  
          <footer>

            <Link className="text-indigo-700 hover:text-pink-700 text-sm float-right" to="/login">Sign In to your Account</Link>
          </footer>   
        </div>
    </div>
  )
}

export default Signup