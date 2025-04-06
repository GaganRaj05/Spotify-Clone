const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        default:null
    }
});

const EMAILVERIFY = mongoose.model("emails",emailSchema);
module.exports = EMAILVERIFY;
