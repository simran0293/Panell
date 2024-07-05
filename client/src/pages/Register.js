import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import toast from 'react-hot-toast'

const Register = () => {

    const[data,setData]=useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        role: "user",// Default role set to user
        secretKey: "" // Add secretKey to state
      })

      const navigate = useNavigate()

      const handleOnChange=(e)=>{
        const{name,value}=e.target;
  
        setData((preve)=>{
          return{
            ...preve,
            [name]: value,
          }
        })
    }

    const handleSubmit=async(e)=>{

      if (data.role === 'admin' && data.secretKey !== "12345") {
        toast.error('Invalid secret key for admin');
        return; // Prevent form submission if secret key is invalid
      }

        e.preventDefault();
        e.stopPropagation();
    
        const URL=`${process.env.REACT_APP_BACKEND_URL}/api/register`
    
        try{
          const response = await axios.post(URL,data)
          
          console.log("Response from server:", response.data);
          if(response.data.status)
            {
              toast.success(response.data.message);
             
              setData(
                {
                  firstName : "",
                  lastName : "",
                  email : "",
                  password : "",
                  role: "user",
                  secretKey: ""
                }
              );
    
              navigate('/login')
            }
            else {
              toast.error(response.data.message);
              console.log("Registration failed:", response.data.message);
           
            }
    
        }catch(error){
         
        // toast.error("Failed to connect to the server.");
        // console.error("Error during registration:", error);
        // }
        if (error.response) {
            toast.error(`Server error: ${error.response.data.message}`);
          } else if (error.request) {
            toast.error('No response from server. Please try again later.');
          } else {
            toast.error(`Error: ${error.message}`);
          }
    
        // console.log("Submitted data:", data);
      }
    }

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3 className='text-lg font-bold text-primary text-center'>
          Welcome to Admin Dashboard!
        </h3>

        <div className='flex flex gap-3 pt-3 justify-center'>
            <label >Role: </label>
            <div className='flex gap-1'>
              <input
                type='radio'
                id='user'
                name='role'
                value='user'
                checked={data.role === 'user'}
                onChange={handleOnChange}
                
              />
              <label htmlFor='user'>User</label>
            </div>
            <div className='flex gap-1'>
              <input
                type='radio'
                id='admin'
                name='role'
                value='admin'
                checked={data.role === 'admin'}
                onChange={handleOnChange}
              />
              <label htmlFor='admin'>Admin</label>
            </div>
          </div>


        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          
        {data.role === 'admin' && (
            <div className='flex flex-col gap-1'>
              <label htmlFor='secretKey'>Secret Key: </label>
              <input
                type='text'
                id='secretKey'
                name='secretKey'
                placeholder='Enter secret key for admin'
                className='px-2 py-1 focus: outline-primary bg-bgPrimary'
                value={data.secretKey}
                onChange={handleOnChange}
                required
              />
            </div>
          )}

          <div className='flex flex-col gap-1'>
            <label htmlFor='firstName'>First Name: </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Enter your first name'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
              value={data.firstName}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='lastName'>Last Name: </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Enter your last name'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
              value={data.lastName}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary '
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          
          

          <button className='bg-buttonColor text-lg px-4 py-1 hover:bg-primary tracking-wider text-white rounded mt-2 font-bold leading-relaxed'>
            Register
          </button>
        </form>

        <p className='my-3 text-center'>Already have account ? <Link to={"/login"} className='hover:text-primary font-semibold'>Login</Link> </p>
      </div>
    </div>
  )
}

export default Register
