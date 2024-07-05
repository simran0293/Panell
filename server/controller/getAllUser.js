const UserModel = require('../models/userModel');

async function getAllUser(req, res) {
    try {
        const users = await UserModel.find({}).select('-password');
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true
        });
    }
}

module.exports = { getAllUser };