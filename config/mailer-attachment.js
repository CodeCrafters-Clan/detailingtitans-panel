const nodemailer = require("nodemailer");
const { TRANSPORTER_MAIL, MAIL_PASS } = process.env;

exports.sendMail = async ({ to, subject, text, html, filename, path }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: TRANSPORTER_MAIL,
      pass: MAIL_PASS,
    },
  });

  const mailOptions = {
    from: "no-reply@gmail.com",
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename,
        path,
      },
    ],
  };

  try {
    // console.log(`sending to ${to}`);
    await transporter.sendMail(mailOptions);
    // console.log(`sended to ${to}`);
  } catch (error) {
    console.log("Email send failed with error:", error);
  }
};
