import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../Components/Header';

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://mern-ecommerce-website.up.railway.app/users/login", {
        email: email,
        password: password
      });
      console.log(response.data);
      if(response.data === "You can log in"){
        navigate("/home")
      }
      else if(response.data === "Email or Password Incorrect"){
        alert("Email or Password Incorrect");
      }
      
    } catch (error) {
      console.log(error);
    }
  };


  return (
    
   <>
   <Header />
   
    <div className='w-full flex justify-center items-center'>
      <div className='w-[18rem] md:w-[22rem] lg:w-[25rem] h-[18rem] shadow-2xl'>
        <h1 className='font-bold text-xl'>Login</h1>
        <form className='flex flex-col items-center mt-8' onSubmit={submit}>
          <input
            className='bg-white border border-1 border-solid border-black border-opacity-30 p-1 w-[15rem] md:w-[19rem] lg:w-[21rem]'
            type='email' 
            required
            placeholder='Enter Email'
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            className='bg-white border border-1 border-solid border-black border-opacity-30 p-1 w-[15rem] md:w-[19rem] lg:w-[21rem] mt-3'
            type='password'
            required
            placeholder='Enter Password'
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className='w-20 h-9  bg-black text-white hover:bg-white hover:text-black mt-4' type='submit'>
            Login
          </button>
          <p className=' text-sm md:text-base mt-6'>
            Don't have an account?{" "}
            <Link to='/signup'>
              <span className='text-blue-800'>Create Account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>

   </>
    
  );
}

export default Login;
