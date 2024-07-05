const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const JWT_SECRET_KEY = process.env.JWT_SECRET;


const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session expired",
            logout: true,
        };
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY);
        const user = await UserModel.findById(decode.id).select('-password');
        if (!user) {
            return {
              message: "User not found",
              logout: true,
            };
          }
        return user;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                message: "Token expired",
                logout: true,
            };
        } else {
            return {
                message: "Invalid token",
                logout: true,
            };
        }
    }
};

module.exports = getUserDetailsFromToken;