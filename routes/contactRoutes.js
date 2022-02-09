const express = require("express");
const nodemailer = require("nodemailer");

const app = express.Router();

app.post("/", (req, res) => {
  let { name, mail, msg } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hanijar2209@gmail.com",
      pass: "nodejs1230",
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "email not sent" });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: "email has been successfully sent" });
    }
  });
});

module.exports = app;
