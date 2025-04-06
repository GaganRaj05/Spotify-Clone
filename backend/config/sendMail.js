const nodemailer = require('nodemailer');

async function sendMail(email,otp) {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.GMAIL_ID,
                pass:process.env.GMAIL_PASS
            }
        });
        let mailOptions = {
            from:"Spotify Clone",
            to:email,
            subject:"Otp request for signing up",
            text:`Your otp for signing up is ${otp}`,
            html:`<p>Your otp for signing up is ${otp}</p>`
        }
        let info = await transporter.sendMail(mailOptions);
        console.log("mail sent successfully");   
    }
    catch(err) {
        console.log(err.message);
        throw new Error("Failed to send mail");
    }
}
module.exports = sendMail;