const mongoose=require('mongoose');

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        firstName:{
            type : String,
            required : [true,"provide firstname"]
        },
        lastName:{
            type : String,
            required : [true,"provide lastname"]
        },
        email : {
            type : String,
            required : [true,"provide email"],
            unique : true
        },
        password:{
            type : String,
            required : [true,"provide password"]
        },      
    })

    const UserModel = mongoose.model('User', userSchema);

    module.exports = UserModel;