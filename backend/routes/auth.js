const express = require('express');
const {handleSignIn,handleSignUp,handleLogout,handleOtpRequests,verifyEmail,handleCheckAuth} = require("../controllers/auth");

const router = express.Router();

router.post("/sign-in",handleSignIn);
router.post("/sign-up",handleSignUp);
router.post("/otp",handleOtpRequests);
router.post("/verify-email",verifyEmail);
router.post("/logout",handleLogout);
router.get("/check-auth",handleCheckAuth)
module.exports = router;