const User = require("../models/user.model");
const Warranty = require("../models/warranty.model");
const ProductKey = require("../models/productkey.model");
const jwt = require("jsonwebtoken");
const { approveWarrantyMail } = require("../utils/mails");

const getallWarranties = async (req, res) => {
  // const warranties = await Warranty.find().lean();
  // if (!warranties?.length) {
  //   return res.status(400).json({ message: "No Warranties Found!!" });
  // }
  // return res.json(warranties);
  const warranties = await Warranty.find()
    .populate("productkey")
    .sort([["createdAt", -1]]);
  if (!warranties?.length) {
    return res.json([]);
  }
  return res.json(warranties);
};

// installer_coverage is a studio name..
const createWarranty = async (req, res) => {
  console.log(req.role);
  const isAdmin = "admin" === req.role;
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
    !installer_coverage
  ) {
    return res.status(400).json({ message: "Necessary fields are required" });
  }

  const productKey = await ProductKey.findOne({ productkey: productkeyId })
    .lean()
    .exec();

  if (!productKey)
    return res.status(400).json({ message: "Invalid product key!!" });

  const user = await User.findById(userId).lean();

  if (!user) return res.status(400).json({ message: "User not exists!" });

  const duplicateWarranty = await Warranty.findOne({
    // "productkey.$oid": productKey.$oid,
    productkey: productKey,
  });

  if (duplicateWarranty) {
    return res.status(409).json({ message: "Duplicate Warranty Found!!" });
  }

  let warrantyObj = {
    user: user._id,
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
    // status: isAdmin,
  };

  for (const key in warrantyObj) {
    if (warrantyObj[key] === null || warrantyObj[key] === undefined) {
      delete warrantyObj[key];
    }
  }

  const warranty = await Warranty.create(warrantyObj);

  if (warranty) {
    const key = await ProductKey.findById(productKey._id);
    if (isAdmin) {
      key.status = isAdmin;
      await key.save();
    } else {
      const keyToken = jwt.sign(
        { id: productKey._id },
        process.env.WARRANTY_ACTION_SECRET,
        { expiresIn: "30d" }
      );

      let data = {
        approvelink: `${
          process.env.FRONTEND_URI
        }/auth/warranty?keyToken=${keyToken}&approve=${true}`,
        denylink: `${
          process.env.FRONTEND_URI
        }/auth/warranty?keyToken=${keyToken}&approve=${false}`,
        productkey: productkeyId,
        name,
        email,
        mobile,
        tenure: key?.tenure,
      };
      approveWarrantyMail(data);
    }
    return res.status(201).json({ message: "New Warranty created" });
  } else {
    return res.status(400).json({ message: "Invalid warranty data received" });
  }
};

// no need for updateWarranty..
const updateWarranty = async (req, res) => {};

const deleteWarranty = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Warranty Id required.." });
  const warranty = await Warranty.findById(id).exec();
  if (!warranty) return res.status(400).json({ message: "Warranty not found" });

  const key = await ProductKey.findById(warranty.productkey);
  // console.log(key);
  if (!key) return res.status(400).json({ message: "Productkey not found" });
  key.status = false;
  await key.save();

  await Warranty.deleteOne();
  return res.json({ message: "Warranty Deleted!!" });
};

const getWarranty = async (req, res) => {
  const id = req.params.id;
  const warranty = await Warranty.findById(id).populate("productkey");
  if (!warranty)
    return res.status(400).json({ message: "Warranty Not Found!" });
  return res.json(warranty);
};

const getUserWarranties = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  if (!userId) return res.status(400).json({ message: "UserID is required" });
  const warranties = await Warranty.find({ user: userId })
    .populate("productkey")
    .sort([["createdAt", -1]]);
  if (!warranties)
    return res.status(400).json({ message: "No User Warranties Found" });
  return res.json(warranties);
};

const checkWarranty = async (req, res) => {
  const { vehNo } = req.params;
  // console.log(vehNo);
  if (!vehNo)
    return res.status(400).json({ message: "Vehicle Number is required" });
  const warranty = await Warranty.findOne({ vehicle_number: vehNo }).populate(
    "productkey"
  );
  if (!warranty) return res.status(400).json({ message: "No Warranty Found" });
  return res.json(warranty._id);
};

const approveWarranty = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  if (!id) return res.status(400).json({ message: "Warranty ID Required" });
  const warranty = await Warranty.findById(id).exec();
  // console.log(warranty);
  if (!warranty) return res.status(400).json({ message: "Warranty not found" });

  const key = await ProductKey.findById(warranty.productkey);
  // console.log(key);
  if (!key) return res.status(400).json({ message: "Productkey not found" });
  key.status = true;
  await key.save();
  return res.json({ message: "Warranty Approved" });
};

const verifykeyToken = async (req, res) => {
  // console.log("started");
  const { keyToken } = req.body;
  // console.log(keyToken);

  if (!keyToken) return res.status(400).json({ message: "Unauthorized" });
  jwt.verify(
    keyToken,
    process.env.WARRANTY_ACTION_SECRET,
    async (err, decoded) => {
      // console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });

      const key = await ProductKey.findById(decoded.id);
      console.log(key);
      if (!key)
        return res.status(401).json({ message: "No Warranty Found" });
      if (key?.status) return res.json({ status: true });
      const warranty = await Warranty.findOne({ productkey: decoded.id });
      if (!warranty) return res.json({ message: "Warranty not Found" });
      // console.log(warranty);
      return res.json({ id: warranty?._id, name: warranty?.name });
    }
  );
};

const keyTokenActions = async (req, res) => {
  const { id } = req.params;
  const { keyToken, action } = req.body;
  // console.log(id, keyToken, action);
  if (!keyToken) return res.status(400).json({ message: "Unauthorized" });
  jwt.verify(
    keyToken,
    process.env.WARRANTY_ACTION_SECRET,
    async (err, decoded) => {
      // console.log(decoded);
      if (err) return res.status(403).json({ message: "Forbidden" });
      else {
        const warranty = await Warranty.findById(id).exec();
        if (warranty) {
          action === "true"
            ? await approveWarranty(req, res)
            : await deleteWarranty(req, res);
        }
      }
    }
  );
};

module.exports = {
  getallWarranties,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarranty,
  getUserWarranties,
  checkWarranty,
  approveWarranty,
  verifykeyToken,
  keyTokenActions,
};
