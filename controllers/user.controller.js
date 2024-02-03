const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getallUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if (!user) res.status(400).json({ message: "User not found" });
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !password || !email || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    name,
    email,
    mobile,
    password: hashedPwd,
  };
  console.log("Yaha");
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

const deleteUser = async (req, res) => {};

const updateUser = async (req, res) => {};

module.exports = {
  getallUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
