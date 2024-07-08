const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"Alvito Game Store" <gamestorealvito@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.htm, // html body
    });
  }


  main().catch(console.error);
});

module.exports = sendEmail;
