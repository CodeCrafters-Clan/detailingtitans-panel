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

const createWarranty = async (req, res) => {};

const updateWarranty = async (req, res) => {};

const deleteWarranty = async (req, res) => {};

const getWarranty = async (req, res) => {
  const id = req.params.id;
  const warranty = await Warranty.findById(id).lean();
  if (!warranty)
    return res.status(400).json({ message: "Warranty Not Found!" });
  return res.json(warranty);
};

module.exports = {
  getallWarranties,
  createWarranty,
  updateWarranty,
  deleteWarranty,
  getWarranty,
};
