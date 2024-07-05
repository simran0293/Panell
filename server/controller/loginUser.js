const UserModel = require('../models/userModel.js'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both the feilds is provided or not
    if (!email || !password) {
      return res.status(400).json({ status: false, message: 'Please provide both email and password' });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid Email (User does not exist)' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password', error: true});
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const cookieOptions={
      http:true,
      secure:true
  }

  return res.cookie('token', token ,cookieOptions).status(200).json({
      message:"Login Successful",
      token:token,
      success: true
  })

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

module.exports = { loginUser };
