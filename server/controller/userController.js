const UserModel = require('../models/userModel');

// Get all users
async function getAllUsers(req, res) {
    try {
        const users = await UserModel.find({}).select('-password'); // Exclude password field
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

// Get a single user by ID
async function getUserById(req, res) {
    try {
        const user = await UserModel.findById(req.params.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false
            });
        }
        res.status(200).json({
            message: 'User fetched successfully',
            data: user,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

// Update a user by ID
async function updateUser(req, res) {
    try {
        const { firstName, lastName, email, role } = req.body;
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, role },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false
            });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: user,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

// Delete a user by ID
async function deleteUser(req, res) {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                status: false
            });
        }
        res.status(200).json({
            message: 'User deleted successfully',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Check for existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, createUser };
