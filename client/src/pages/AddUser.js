import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/newuser`, {
                firstName,
                lastName,
                email,
                password,
                role
            }, {
                withCredentials: true,
            });
            navigate('/dashboard'); // Redirect to the UserTable or any other page
        } catch (error) {
            console.error("Error adding user:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>First Name</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Last Name</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                    <div className='flex items-center'>
                        <label className='mr-4'>
                            <input
                                type='radio'
                                value='user'
                                checked={role === 'user'}
                                onChange={() => setRole('user')}
                                className='mr-1'
                            />
                            User
                        </label>
                        <label>
                            <input
                                type='radio'
                                value='admin'
                                checked={role === 'admin'}
                                onChange={() => setRole('admin')}
                                className='mr-1'
                            />
                            Admin
                        </label>
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default AddUser;
