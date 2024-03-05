const otpGenerator = require("otp-generator");

const generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};

module.exports = {
  generateOtp,
};
