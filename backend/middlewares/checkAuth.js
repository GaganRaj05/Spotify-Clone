const jsonwebtoken = require('jsonwebtoken');
function checkAuth(req, res,next) {
    try {
        console.log("working")
        const token = req.cookies.authtoken;
        if(!token) return res.status(400).json("Please login to use this feature");

        const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user_id = decode.id;
        console.log("this is middleware",req.user_id);
        next(); 
    }
    catch(err) {
        console.log(err.message);
        return res.status(400).json("Your session has expired please re-login");
    }
}
module.exports = checkAuth;