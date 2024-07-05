
const UserModel = require('../models/userModel');

async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const userExist = await UserModel.findById(id);
        if(!userExist)
        {
            return res.status(401).json({message: "User not found"});
        }
        const updatedData = await UserModel.findByIdAndUpdate(id,req.body, {new:true})
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true
        });
    }
}

module.exports = { updateUser };