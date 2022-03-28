const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express.Router();

app.post("/", (req, res) => {
  let { name, mail, msg } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: mail,
    to: "hanijar2209@gmail.com",
    subject: "new contact from your portfolio",
    text: `${name} has contacted you
    
    please contact them back on ${mail}
    
    ${msg}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "email not sent" });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: "email has been successfully sent" });
    }
  });
});
// haniah-api.herokuapp.com/

https: module.exports = app;
