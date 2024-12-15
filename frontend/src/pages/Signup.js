import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Header from '../Components/Header';

function Signup() {

  const [email, setemail] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/register", {
        fullname: fullname,
        email: email,
        password: password
      });
      console.log(response.data);

      if(response.data ==="You already have an account. Please Login"){
        alert("You already have an account, Please Login");
      }
      else if(response.data === "User created successfully"){
        alert("User created Successfully");

        setfullname("");
      setemail("");
      setpassword("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <>

    <Header />

    <div className='w-full flex justify-center items-center'>

      <div className='w-[18rem] md:w-[22rem] lg:w-[25rem] h-[20rem] shadow-2xl'>
        <h1 className='font-bold text-xl'>Sign Up</h1>

        <form className='flex flex-col items-center mt-8'>
          <input value={fullname} className='bg-white border border-1 border-solid border-black border-opacity-30 p-1 w-[15rem] md:w-[19rem] lg:w-[21rem]' type='text' required placeholder='Enter Name' onChange={(e) => {
            setfullname(e.target.value)
          }} name='fullname'/>
          <input value={email} className='bg-white border border-1 border-solid border-black border-opacity-30 p-1 w-[15rem] md:w-[19rem] lg:w-[21rem] mt-3' type='text' required placeholder='Enter Email' onChange={(e) => {
            setemail(e.target.value)
          }} name='email'/>
          <input value={password} className='bg-white border border-1 border-solid border-black border-opacity-30 p-1 w-[15rem] md:w-[19rem] lg:w-[21rem] mt-3' type='password' required placeholder='Enter Password' onChange={(e) => {
            setpassword(e.target.value)
          }} name='password'/>
          <button onClick={submit} className='w-20 h-9  bg-black text-white hover:bg-white hover:text-black mt-4' type='submit'>Sign Up</button>
          <p className='text-sm md:text-base mt-6'>Already have an account? <Link to='/login'><span className='text-blue-800'>Login</span></Link></p>
        </form>

      </div>
    </div>
    </>
  )
}

export default Signup