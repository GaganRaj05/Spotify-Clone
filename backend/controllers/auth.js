const User = require("../Models/User");
const sendMail = require("../config/sendMail");
const EMAILVERIFY = require("../Models/Email");
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

async function handleSignIn(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        if(!user) return res.status(401).json("Please create an account");
        
        const result = await bcryptjs.compare(password,user.password);
        if(!result) return res.status(401).json("Incorrect password");

        const token = jsonwebtoken.sign({id:user._id,username:user.name,email:user.email,profile_pic:user.profile_pic},process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie("authtoken",token,{
            httpOnly:false,
            secure:false,
            sameSite:'lax',
            path:"/"
        });
        return res.status(200).json("Login successfull");

    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
    
}

async function handleSignUp(req, res) {
  try {
    const {  name, email, password, gender, dob, country } = req.body;
    const hashedPassword = await bcryptjs.hash(password,await bcryptjs.genSalt(10));
    const hashedUsername = await bcryptjs.hash(name,await bcryptjs.genSalt(10));
    console.log(hashedUsername);
    await User.create({
        name,
        email,
        password:hashedPassword,
        username:hashedUsername,
        gender,
        dob,
        country,
    });
    return res.status(201).json("Account created successfully");

  } catch (err) {
    console.log(err.message);
    return res.status(501).json("Some error occured please try again later");
  }
}
async function handleLogout(req, res) {
    try {   
        res.clearCookie("authtoken",{
            httpOnly:false,
            secure:false,
            sameSite:'lax',
            path:"/"
        })
        return res.status(201).json("Logout successfull");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured please try again later");
    }
}
async function verifyEmail(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await EMAILVERIFY.findOne({email});
    if(!user) return res.status(501).json("Some error occured please try again later");

    if(user.otp !== otp) return res.status(401).json("Incorrect OTP");
    user.otp = null;
    user.save();
    return res.status(201).json("Email verified successfully ")
  } catch (err) {
    console.log(err.message);
    return res.status(501).json("Some error occured please try again later");
  }
}
async function handleOtpRequests(req, res) {
  try {
    const { email } = req.body;
    const emailExists = await EMAILVERIFY.findOne({email});
    if(emailExists) return res.status(401).json("Email exists please login");

    let otp = "";
    for (var i = 0; i < 6; i++) {
      otp += Math.floor(Math.random(0, 1) * 10);
    }

    await sendMail(email,otp);
    await EMAILVERIFY.create({
        email,
        otp
    });
    return res.status(201).json("Otp sent successfully to ur email address");
  } catch (err) {
    console.log(err.message);
    return res.status(501).json("Some error occured please try again later");
  }
}

async function handleCheckAuth(req, res) {
  try {
    const token = req.cookies.authtoken;
    if(!token) res.status(401)
    
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = {
      id:decoded.id,
      name:decoded.name,
      email:decoded.email,
      profile_pic:decoded.profile_pic
    }

    return res.status(201).json(user);

  }
  catch(err) {
    console.log(err.message);
    return res.status(501).json("Some error occured please try again later");
  }
}

module.exports = { handleSignIn, handleSignUp, handleLogout, handleOtpRequests,verifyEmail, handleCheckAuth };
