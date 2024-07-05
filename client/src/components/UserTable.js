import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
                    withCredentials: true,
                });
                setUsers(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);  // Navigate to the EditUser page
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`, {
                withCredentials: true,
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='overflow-x-auto mt-5'>
            <h3 className='text-lg font-bold text-primary text-center mb-4'>
                User Management
            </h3>

            <div className='flex justify-end p-4 pr-7'>
                    <button
                        onClick={() => navigate('/add-user')}
                        className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
                    >
                        Add New User
                    </button>
                </div>

            <div className='bg-white w-full max-w-3xl rounded overflow-hidden mx-auto shadow-md'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-2 px-4 border-b'>First Name</th>
                            <th className='py-2 px-4 border-b'>Last Name</th>
                            <th className='py-2 px-4 border-b'>Email</th>
                            <th className='py-2 px-4 border-b'>Role</th>
                            <th className='py-2 px-4 border-b'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className='py-2 px-4 border-b'>{user.firstName}</td>
                                <td className='py-2 px-4 border-b'>{user.lastName}</td>
                                <td className='py-2 px-4 border-b'>{user.email}</td>
                                <td className='py-2 px-4 border-b'>{user.role}</td>
                                <td className='py-2 px-4 border-b'>
                                    <button
                                        onClick={() => handleEdit(user._id)}
                                        className='text-blue-500 hover:underline'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className='text-red-500 hover:underline ml-2'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
