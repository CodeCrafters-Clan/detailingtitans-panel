const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { forgotpasswordMail } = require("../utils/mails");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  // console.log(foundUser);
  if (!foundUser || !foundUser?.status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = jwt.sign(
    { id: foundUser._id, role: foundUser?.role },
    process.env.AUTH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  // it is not working with nextJs
  // res.cookie("jwt", refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
  res.json({
    user: foundUser._id,
    refreshToken: refreshToken,
    role: foundUser.role,
  });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt)
    return res.status(204).json({ message: "Already Logged Out!!" }); //No content
  res.clearCookie("jwt", {
    // httpOnly: true,
    // sameSite: "None",
    // secure: true,
  });
  res.json({ message: "Logged Out Successfully !!" });
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  if (!email) return res.status(400).json({ message: "Email is required" });

  const foundUser = await User.findOne({ email }).exec();
  // console.log(foundUser);
  if (!foundUser) return res.status(400).json({ message: "Email not exists" });

  const resetToken = jwt.sign(
    { id: foundUser._id },
    process.env.RESET_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  let data = {
    reset: `${process.env.FRONTEND_URI}/auth/reset-password?resetToken=${resetToken}`,
    email: email,
    username: foundUser?.name,
  };

  const check = forgotpasswordMail(data) || false;
  // console.log(check);
  res.json({ message: true });
};

const verifyToken = async (req, res) => {
  const { verifyToken } = req.body;

  if (!verifyToken) return res.status(400).json({ message: "Unauthorized" });

  jwt.verify(
    verifyToken,
    process.env.RESET_TOKEN_SECRET,
    async (err, decoded) => {
      // console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.id).select("-password");
      // console.log(foundUser);
      // if (!foundUser || foundUser.resetToken !== verifyToken)
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      return res.json({ message: true });
    }
  );
};

const resetPassword = async (req, res) => {
  const { verifyToken, password } = req.body;
  if (!verifyToken || !password)
    return res.status(400).json({ message: "Missing required parameters" });

  jwt.verify(
    verifyToken,
    process.env.RESET_TOKEN_SECRET,
    async (err, decoded) => {
      // console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.id);
      // console.log(foundUser);
      // if (!foundUser || foundUser.resetToken !== verifyToken)
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const hashedPwd = await bcrypt.hash(password, 10);
      foundUser.password = hashedPwd;
      // foundUser.resetToken = "";

      await User.findByIdAndUpdate(foundUser._id, foundUser);

      return res.json({ message: true });
    }
  );
};

module.exports = {
  login,
  logout,
  forgotpassword,
  verifyToken,
  resetPassword,
};
