const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../config/mailer");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();
  //   console.log(foundUser);
  if (!foundUser || !foundUser.status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    { id: foundUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ token: accessToken });
};

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      //   console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.id).select("-password");
      //   console.log(foundUser);
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        { id: foundUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ token: accessToken });
    }
  );
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).json({ message: "Already Logged Out!!" }); //No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Logged Out Successfully !!" });
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(400).json({ message: "Invalid Email" });

  const resetToken = jwt.sign(
    { id: foundUser._id },
    process.env.RESET_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  // foundUser.resetToken = resetToken;

  // await User.findByIdAndUpdate(foundUser._id, foundUser);

  console.log(`http://localhost:3000/reset-password?resetToken=${resetToken}`);

  // const userObject = {
  //   to: email,
  //   subject: "Hello",
  //   text: "Nice",
  // };
  // await sendMail(userObject);

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
      if (!foundUser)
        return res.status(401).json({ message: "Unauthorized" });

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
      if (!foundUser)
        return res.status(401).json({ message: "Unauthorized" });

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
  refresh,
  logout,
  forgotpassword,
  verifyToken,
  resetPassword,
};
