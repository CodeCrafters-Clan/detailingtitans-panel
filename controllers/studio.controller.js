const Studio = require("../models/studio.model");
const User = require("../models/user.model");

const getallStudios = async (req, res) => {
  const studios = await Studio.find().lean();
  if (!studios?.length) {
    return res.status(400).json({ message: "No studios found" });
  }
  return res.json(studios);
};

const createStudio = async (req, res) => {
  const {
    userId,
    address,
    city,
    pincode,
    company_name,
    gst_number,
    gst_doc,
    pan_number,
    pan_doc,
    studio_doc,
    aadhar_number,
    aadhar_doc,
    user_doc,
    comment,
  } = req.body;

  if (
    !userId ||
    !address ||
    !city ||
    !pincode ||
    !company_name ||
    !gst_number ||
    !gst_doc ||
    !pan_number ||
    !pan_doc ||
    !studio_doc ||
    !aadhar_number ||
    !aadhar_doc ||
    !user_doc
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(userId).exec();
  if (!user) return res.status(400).json({ message: "User not exists!" });

  let studioObj = {
    user: userId,
    address,
    city,
    pincode,
    company_name,
    gst_number,
    gst_doc,
    pan_number,
    pan_doc,
    studio_doc,
    aadhar_number,
    aadhar_doc,
    user_doc,
  };

  if (comment) {
    studioObj = { ...studioObj, comment };
  }

  const studio = await Studio.create(studioObj);

  if (studio) {
    return res.status(201).json({ message: "New Studio created" });
  } else {
    return res.status(400).json({ message: "Invalid studio data received" });
  }
};

const updateStudio = async (req, res) => {
  const {
    id,
    userId,
    address,
    city,
    pincode,
    company_name,
    gst_number,
    gst_doc,
    pan_number,
    pan_doc,
    studio_doc,
    aadhar_number,
    aadhar_doc,
    user_doc,
    comment,
  } = req.body;

  if (
    !id ||
    !userId ||
    !address ||
    !city ||
    !pincode ||
    !company_name ||
    !gst_number ||
    !gst_doc ||
    !pan_number ||
    !pan_doc ||
    !studio_doc ||
    !aadhar_number ||
    !aadhar_doc ||
    !user_doc
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const studio = await Studio.findById(id).exec();

  if(!studio) return res.status(400).json({ message: "Note not found" });
};

module.exports = {
  getallStudios,
  createStudio,
};
