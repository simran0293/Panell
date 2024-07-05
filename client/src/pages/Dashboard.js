import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Home from './Home'; // Import Home component for users
import UserTable from '../components/UserTable';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/me`, {
                    withCredentials: true,
                });
                setUser(response.data.data);
                setAdmin(response.data.data.role === 'admin');
                setLoading(false);

                // Redirect to home page if user is not an admin
                if (response.data.data.role === 'user') {
                    navigate('/home');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.logout) {
                        toast.error(error.response.data.message);
                        navigate('/login');
                    } else {
                        toast.error(error.response.data.message);
                    }
                } else {
                    toast.error("No response from server. Please try again later.");
                }
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            toast.error("Error logging out. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='mt-5'>
        {admin ? (
            <>
                <button
                        onClick={handleLogout}
                        className='absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600'
                    >
                        Logout
                    </button>
                <h3 className='text-lg font-bold text-primary text-center mb-4'>
                    Admin Dashboard
                </h3>
                <div className='bg-white w-full max-w-5xl pb-8 rounded overflow-hidden pt-4 mx-auto text-center'>
                    {/* Add content for the admin dashboard here */}
                    <UserTable/>
                </div>
            </>
        ) : (
            <Home /> // Render Home component for users
        )}
    </div>
        
    );
};

export default Dashboard;
