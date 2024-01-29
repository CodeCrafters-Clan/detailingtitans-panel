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
    // userId,
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
    // !userId ||
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
  if (!studio) return res.status(400).json({ message: "Studio not found" });

  studio.address = address;
  studio.city = city;
  studio.pincode = pincode;
  studio.company_name = company_name;
  studio.gst_number = gst_number;
  studio.gst_doc = gst_doc;
  studio.pan_number = pan_number;
  studio.pan_doc = pan_doc;
  studio.studio_doc = studio_doc;
  studio.aadhar_number = aadhar_number;
  studio.aadhar_doc = aadhar_doc;
  studio.user_doc = user_doc;

  if (comment) {
    studio.comment = comment;
  }

  const updatedStudio = await studio.save();

  return res.json({ message: `Updated Successfully!!` });
};

const deleteStudio = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Studio ID Required" });
  const studio = await Studio.findById(id).exec();
  if (!studio) return res.status(400).json({ message: "Studio not found" });
  const result = await studio.deleteOne();
  return res.json({ message: `studio deleted!!` });
};

const getStudio = async (req,res) => {
  const id = req.params.id;
  const studio = await Studio.findById(id).lean();
  if(!studio) return res.status(400).json({message:"Studio not found"});
  return res.json(studio);
}

module.exports = {
  getallStudios,
  createStudio,
  updateStudio,
  deleteStudio,
  getStudio,
};
