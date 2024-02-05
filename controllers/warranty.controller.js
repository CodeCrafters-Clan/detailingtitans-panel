const User = require("../models/user.model");
const Warranty = require("../models/warranty.model");
const ProductKey = require("../models/productkey.model");

const getallWarranties = async (req, res) => {
  const warranties = await Warranty.find().lean();
  if (!warranties?.length) {
    return res.status(400).json({ message: "No Warranties Found!!" });
  }
  return res.json(warranties);
};

// installer_coverage is a studio name..
const createWarranty = async (req, res) => {
  const {
    userId,
    productkeyId,
    name,
    email,
    mobile,
    address,
    city,
    pincode,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_number,
    vehicle_chassi_no,
    vehicle_installation_date,
    installer_coverage,
    installer_by,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo1name,
    photo2name,
    photo3name,
    photo4name,
    photo5name,
    comment,
    videolink,
  } = req.body;

  if (
    !productkeyId ||
    !name ||
    !email ||
    !mobile ||
    !address ||
    !city ||
    !pincode ||
    !vehicle_year ||
    !vehicle_make ||
    !vehicle_model ||
    !vehicle_number ||
    !vehicle_chassi_no ||
    !vehicle_installation_date ||
    !installer_coverage ||
    !installer_by
  ) {
    return res.status(400).json({ message: "Necessary fields are required" });
  }

  const productKey = await ProductKey.findOne({ productkey: productkeyId })
    .lean()
    .exec();

  if (!productKey)
    return res.status(400).json({ message: "Invalid product key!!" });

  const user = await User.findById(userId).lean();

  if(!user)
    return res.status(400).json({message:"User not exists!"});

  // console.log(productKey);
  const duplicateWarranty = await Warranty.findOne({
    // "productkey.$oid": productKey.$oid,
    productkey: productKey,
  });

  // console.log(duplicateWarranty);

  if (duplicateWarranty) {
    return res.status(409).json({ message: "Duplicate Warranty Found!!" });
  }

  // console.log(duplicateWarranty);
  // console.log(productKey._id);

  let warrantyObj = {
    user:user._id,
    productkey: productKey._id,
    name,
    email,
    mobile: Number(mobile),
    address,
    city,
    pincode,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_number,
    vehicle_chassi_no,
    vehicle_installation_date,
    installer_coverage,
    installer_by,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo1name,
    photo2name,
    photo3name,
    photo4name,
    photo5name,
    comment,
    videolink,
  };

  for (const key in warrantyObj) {
    if (warrantyObj[key] === null || warrantyObj[key] === undefined) {
      delete warrantyObj[key];
    }
  }

  // console.log(warrantyObj);

  const warranty = await Warranty.create(warrantyObj);

  if (warranty) {
    return res.status(201).json({ message: "New Warranty created" });
  } else {
    return res.status(400).json({ message: "Invalid warranty data received" });
  }
};

// no need for updateWarranty..
const updateWarranty = async (req, res) => {};

const deleteWarranty = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Warranty Id required.." });
  const warranty = await Warranty.findById(id).exec();
  if (!warranty) return res.status(400).json({ message: "Warranty not found" });
  await Warranty.deleteOne();
  return res.json({ message: "Warranty Deleted!!" });
};

const getWarranty = async (req, res) => {
  const id = req.params.id;
  const warranty = await Warranty.findById(id).lean();
  if (!warranty)
    return res.status(400).json({ message: "Warranty Not Found!" });
  return res.json(warranty);
};

const getUserWarranties = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
};

const checkWarranty = async (req, res) => {
  const { vehNo } = req.params;
  console.log(vehNo);
};

const approveWarranty = async (req,res) => {

}

module.exports = {
  getallWarranties,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarranty,
  getUserWarranties,
  checkWarranty,
  approveWarranty,
};
