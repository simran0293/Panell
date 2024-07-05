const bcryptjs=require('bcryptjs');
const UserModel = require('../models/userModel');

async function registerUser(request,response){
    try{
        const { role,secretKey,firstName,lastName, email, password} = request.body;
        //check if the user with the given email already exists or not
        const checkEmail = await UserModel.findOne({email}); //{name,email} if find and null if not find

        if(checkEmail)
        {
            return response.status(400).json({
                message: "Already user exists",
                error: true
            })
        }

        if (role === 'admin' && secretKey !== "12345") {
            return response.status(400).json({ message: 'Invalid secret key for admin', status: false });
          }

        //convert password into the hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        //now we want to save all the details onto database
        const payload ={
            firstName,
            lastName,
            email,
            role,
            password: hashPassword
        }

        const user = new UserModel(payload);
        const userSave = await user.save();

        return response.status(201).json({
            message: "User created successfully",
            data: userSave,
            status: true
        })

    }catch(error){
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = registerUser;