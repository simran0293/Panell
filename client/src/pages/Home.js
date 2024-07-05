import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/me`, {
                    withCredentials: true,});
                    console.log('Response from server:', response.data);
                setUser(response.data.data);
            } catch (error) {
                if (error.response) {
                    if (error.response.data.logout) {
                        toast.error(error.response.data.message);
                        localStorage.removeItem('token');
                        navigate('/login');
                    } else {
                        toast.error(error.response.data.message);
                    }
                } else {
                    toast.error("No response from server. Please try again later.");
                }
            }
        };

        fetchUserDetails();
     },[]);


     const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {}, { withCredentials: true });
            localStorage.removeItem('token');
            navigate('/login');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to log out. Please try again.');
        }
    };


    if (!user) return <p>Loading...</p>;

    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto flex flex-col justify-center'>
                <h3 className='text-lg font-bold text-primary text-center'>
                    Welcome, {user.firstName}!
                </h3>
                <p className='text-center text-lg mt-2 flex justify-center'><div className='font-bold'>Email:</div> {user.email}</p>
                <button
                    onClick={handleLogout}
                    className='bg-buttonColor text-lg px-4 mx-auto py-1 hover:bg-primary tracking-wider text-white rounded mt-2 font-bold leading-relaxed'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
