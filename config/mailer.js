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
    // console.log(`sending to ${to}`);
    await transporter.sendMail(mailOptions);
    // console.log(`sended to ${to}`);
  } catch (error) {
    console.log("Email send failed with error:", error);
  }
};

/*

// const userObject = {
//   to: email,
//   subject: "Hello",
//   text: "Nice",
// };
// await sendMail(userObject);


const { email1, email2, email3 } = req.body;
let emailsList = [email1, email2, email3];

  let emails = [];
  for (let i = 0; i < emailsList.length; i++) {
    emails[i] = {
      to: emailsList[i],
      subject: "Hello",
      text: "Hello",
    };
  }

  let toSend = [];
  emails.forEach((item) => {
    toSend.push(sendMail(item));
  });
  console.log(toSend);

  Promise.all([...toSend]).then(
    (response) => {
      console.log(response);
    },
    (err) => {
      console.log(err);
    }
  );

*/
