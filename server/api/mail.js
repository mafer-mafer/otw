const router = require("express").Router();
const nodeMailer = require("nodemailer");
const SECRETS = require("../secrets.js");

module.exports = router;

router.post("/send", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_KEY || SECRETS.MAIL_KEY,
      pass: process.env.MAIL_SECRET || SECRETS.MAIL_SECRET,
    },
  });
  let mailOptions = {
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  //   res.writeHead(301, { statusMessage: "hello" }); do i need this? look into
  res.end();
});
