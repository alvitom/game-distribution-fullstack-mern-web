const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const emailTemplate = require("./emailTemplate");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Alvito Game Store" <abc@gmail.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: emailTemplate(data.htm), // html body
  });
});

module.exports = sendEmail;
