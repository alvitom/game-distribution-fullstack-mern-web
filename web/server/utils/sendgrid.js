const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = {
    to: data.to,
    from: process.env.SENDGRID_EMAIL,
    subject: data.subject,
    text: data.text,
    html: data.htm,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
