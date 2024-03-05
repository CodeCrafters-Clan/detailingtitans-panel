const { sendMail } = require("../config/mailer");
const Otp = require("../models/otp.model");
const { generateOtp } = require("../utils/otp");

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  if (!email) return res.status(400).json({ message: "Email is required!" });

  await Otp.findOneAndDelete({ entity: email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  const obj = await Otp.create({
    entity: email,
    otp,
  });

  if (obj) {
    const mailobj = {
      to: email,
      subject: "Detailing Titans : OTP",
      text: `Your OTP is ${otp}`,
    };
    res.status(201).json(obj);
    await sendMail(mailobj);
    return;
  }
  return res
    .status(400)
    .json({ message: "There was some error while senidng the otp.." });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email && !otp)
    return res.status(400).json({ message: "Email & Otp are required" });

  const emailObj = await Otp.findOne({ entity: email });

  if (otp == emailObj?.otp) {
    await emailObj.deleteOne();
    return res.status(200).json({ message: "Otp  Verified Successfully" });
  }
  return res.status(400).json({ message: "Invalid Otp" });
};

module.exports = {
  sendOtp,
  verifyOtp,
};

//   const accountSid = "AC369c4f3e222eb26ec8fd7760a457a7a9";
//   const authToken = "5b96040db1d2ef642bdfe700cab322c7";
//   const verifySid = "VAd3e9917781de06266429970bc2e8f0c7";
//   const client = require("twilio")(accountSid, authToken);

//   client.verify.v2
//     .services(verifySid)
//     .verifications.create({ to: "+919319979805", channel: "sms" })
//     .then((verification) => console.log(verification.status))
//     .then(() => {
//       const readline = require("readline").createInterface({
//         input: process.stdin,
//         output: process.stdout,
//       });
//       readline.question("Please enter the OTP:", (otpCode) => {
//         client.verify.v2
//           .services(verifySid)
//           .verificationChecks.create({ to: "+919319979805", code: otpCode })
//           .then((verification_check) => console.log(verification_check.status))
//           .then(() => readline.close());
//       });
//     });
