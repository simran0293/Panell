import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

    try {
      const response = await axios.post(URL, data, { withCredentials: true });
      console.log("Response from server:", response.data);
      if (response?.data?.success) {
        console.log('Login successful, token:', response.data.token); 
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token); // Save JWT token
        navigate('/dashboard'); // Redirect to dashboard page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3 className='text-lg font-bold text-primary text-center'>
          Login
        </h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='px-2 py-1 focus: outline-primary bg-bgPrimary'
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
            Login
          </button>
        </form>

        <p className='my-3 text-center'>Don't have an account? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link> </p>
      </div>
    </div>
  );
}

export default Login;
