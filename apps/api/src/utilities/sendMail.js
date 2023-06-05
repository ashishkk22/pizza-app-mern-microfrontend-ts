const nodemailer = require("nodemailer");

//to  send the mail based on the different conditions
module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NX_GMAIL_USER, // generated ethereal user
      pass: process.env.NX_GMAIL_PASS, // generated ethereal password
    },
  });
  var Osubject, Ohtml;
  if (str == "otp") {
    Osubject = "OTP to verify your email id with Pizza App";
    Ohtml = `<div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2 style="text-align:"center">Welcome to the Pizza App.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started.</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.otp}</h1>
        <p style="margin-top: 15px;">Otp is valid for only 5 minutes. Please don't share the otp with anyone.</p>
   </div>`;
  }
  if (str == "forgotPassword") {
    Osubject = `OTP to reset password of your account with Pizza App`;
    Ohtml = `<div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2 style="text-align:"center">Pizza App</h2>
        <p style="margin-bottom: 30px;">Pleas enter the reset password  OTP to update the password.</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${data.otp}</h1>
         <p style="margin-top: 15px;">Otp is valid for only 5 minutes. Please don't share the otp with anyone.</p>
   </div>`;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pizza 30 Minute" <pizza.30minute@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    html: Ohtml, // html body
  });
};
