const Studio = require("../models/studio.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  approveStudioMail,
  deleteStudioMail,
  succeesStudioMail,
} = require("../utils/mails");

const getallStudios = async (req, res) => {
  // const studios = await Studio.find().lean();
  // if (!studios?.length) {
  //   return res.status(400).json({ message: "No studios found" });
  // }
  const studioswithUser = await Studio.find()
    .populate("user")
    .sort([["createdAt", -1]]);
  if (!studioswithUser?.length) {
    // return res.status(400).json({ message: "No studios found" });
    return res.json([]);
  }
  return res.json(studioswithUser);
};

// the status we are getting here is off user not for studio..
const createStudio = async (req, res) => {
  const {
    userId,
    user_doc_name,
    aadhar_doc_name,
    studio_doc_name,
    pan_doc_name,
    gst_doc_name,
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
    status,
  } = req.body;

  if (
    !userId ||
    !address ||
    !city ||
    !pincode ||
    !studio_doc ||
    !aadhar_number ||
    !aadhar_doc ||
    !user_doc
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(userId).exec();
  if (!user) return res.status(400).json({ message: "User not exists!" });

  user.status = status;
  console.log(user);

  if (status) {
    let data = {
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    };
    succeesStudioMail(data);
  } else {
    const studioToken = jwt.sign(
      { id: user?._id },
      process.env.STUDIO_ACTION_SECRET,
      { expiresIn: "30d" }
    );

    let data = {
      approvelink: `${
        process.env.FRONTEND_URI
      }/auth/studio?studioToken=${studioToken}&approve=${true}`,
      denylink: `${
        process.env.FRONTEND_URI
      }/auth/studio?studioToken=${studioToken}&approve=${false}`,
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    };
    approveStudioMail(data);
  }

  let studioObj = {
    user: userId,
    address,
    city,
    user_doc_name,
    aadhar_doc_name,
    studio_doc_name,
    pan_doc_name,
    gst_doc_name,
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
  await user.save();
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
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Studio ID Required" });

  const studio = await Studio.findById(id).exec();
  if (!studio) return res.status(400).json({ message: "Studio not found" });

  const user = await User.findById(studio.user);

  let data = {
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  };

  await user.deleteOne();
  await studio.deleteOne();

  deleteStudioMail(data);

  return res.json({ message: `Studio Deleted!!` });
};

const getStudio = async (req, res) => {
  const id = req.params.id;
  const studio = await Studio.findById(id).populate("user");
  if (!studio) return res.status(400).json({ message: "Studio not found" });
  return res.json(studio);
};

const approveStudio = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Studio ID Required" });

  const studio = await Studio.findById(id).exec();
  if (!studio) return res.status(400).json({ message: "Studio not found" });
  const user = await User.findById(studio.user);
  if (!user) return res.status(400).json({ message: "User not found" });

  let data = {
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
  };

  succeesStudioMail(data);

  user.status = true;
  await user.save();
  return res.json({ message: `Studio Approved` });
};

const getUserStudio = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  if (!userId) return res.status(400).json({ message: "UserID is required" });
  const studios = await Studio.find({ user: userId })
    .populate("user")
    .sort([["createdAt", -1]]);
  if (!studios)
    return res.status(400).json({ message: "No User Studios Found" });
  return res.json(studios);
};

const verifystudioToken = async (req, res) => {
  const { studioToken } = req.body;
  if (!studioToken) return res.status(400).json({ message: "Unauthorized" });
  jwt.verify(
    studioToken,
    process.env.STUDIO_ACTION_SECRET,
    async (err, decoded) => {
      // console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });

      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "No Studio Found" });

      if (user?.status) return res.json({ status: true });
      const studio = await Studio.findOne({ user: decoded.id });

      if (!studio) return res.json({ message: "Studio not Found" });
      return res.json({ id: studio?._id, name: user?.name });
    }
  );
};

const studioTokenActions = async (req, res) => {
  const { id } = req.params;
  const { studioToken, action } = req.body;

  if (!studioToken) return res.status(400).json({ message: "Unauthorized" });
  jwt.verify(
    studioToken,
    process.env.STUDIO_ACTION_SECRET,
    async (err, decoded) => {
      console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });
      else {
        const studio = await Studio.findById(id).exec();
        if (studio) {
          action === "true"
            ? await approveStudio(req, res)
            : await deleteStudio(req, res);
        }
      }
    }
  );
};

module.exports = {
  getallStudios,
  createStudio,
  updateStudio,
  deleteStudio,
  getStudio,
  approveStudio,
  getUserStudio,
  verifystudioToken,
  studioTokenActions,
};
