const nodemailer = require("nodemailer");
const { TRANSPORTER_MAIL, MAIL_PASS } = process.env;

exports.sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: TRANSPORTER_MAIL,
      pass: MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "deepakpvt26@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Eamil sent successfully");
  } catch (error) {
    console.log("Email send failed with error:", error);
  }
};
