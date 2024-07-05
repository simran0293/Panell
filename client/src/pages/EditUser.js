import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [user, setUser] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Get the user ID from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`, {
                    withCredentials: true,
                });
                setUser(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`, user, {
                withCredentials: true,
            });
            navigate('/dashboard');  // Redirect back to the admin dashboard after successful update
        } catch (error) {
            console.error("Error updating user:", error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>; // Handle case where `user` is null

    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
                <h3 className='text-lg font-bold text-primary text-center mb-4'>
                    Edit User
                </h3>
                <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='px-2 py-1 focus:outline-primary bg-bgPrimary'
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='px-2 py-1 focus:outline-primary bg-bgPrimary'
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='px-2 py-1 focus:outline-primary bg-bgPrimary'
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='role'>Role:</label>
                        <select
                            id='role'
                            name='role'
                            className='px-2 py-1 focus:outline-primary bg-bgPrimary'
                            value={user.role}
                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                            required
                        >
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    <button className='bg-buttonColor text-lg px-4 py-1 hover:bg-primary tracking-wider text-white rounded mt-2 font-bold leading-relaxed'>
                        Update User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
