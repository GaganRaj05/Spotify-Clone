const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    profile_pic: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    username: {
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    dob: {
        type:Date,
        required:true
    },
    country: {
        type:String,
        required:true,   
    },
});

const User = mongoose.model("users",usersSchema);

module.exports = User;