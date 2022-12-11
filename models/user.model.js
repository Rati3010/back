const mongoose = require('mongoose');

const userSchema = ({
    email:String,
    name:String,
    age:Number,
    password:String
}) 

const UserModel = mongoose.model("user",userSchema);

module.exports ={UserModel};