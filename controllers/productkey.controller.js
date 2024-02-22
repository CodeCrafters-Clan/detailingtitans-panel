const ProductKey = require("../models/productkey.model");
const data = {};

data.productkeys = require("../data/productkey.json");

const getTenure = (productKey) => {
  if (
    productKey.startsWith("TPHAP") ||
    productKey.startsWith("TPUTM") ||
    productKey.startsWith("TPUCI")
  ) {
    return 3;
  } else if (productKey.startsWith("TPUAG") || productKey.startsWith("TPUOM")) {
    return 5;
  } else if (productKey.startsWith("TPUHE")) {
    return 7;
  } else if (productKey.startsWith("TPUZE")) {
    return 8;
  } else {
    return 2;
  }
};

// in mongo compass - { "productkey": { "$regex": /^TPHAP/ } }

const readtoDB = async (req, res) => {
  console.log(data.productkeys.length);
  let productkeyData = [],
    count = 0,
    notactive = 0;
  // console.log(data.productkeys[0].productkey);

  for (let i = 0; i < data.productkeys.length; i++) {
    if (data.productkeys[i].status === "taken") {
      count++;
      productkeyData.push({
        productkey: data.productkeys[i].productkey,
        tenure: getTenure(data.productkeys[i].productkey),
        status: false,
      });
    } else {
      notactive++;
      productkeyData.push({
        productkey: data.productkeys[i].productkey,
        tenure: getTenure(data.productkeys[i].productkey),
        status: false,
      });
    }
  }

  await ProductKey.insertMany(productkeyData);
  console.log(count, "   ", notactive);
  res.send({ message: "Done!!" });
};

const getKeyDetails = async (req, res) => {
  const { key } = req.params;
  console.log(key);
  const productkey = await ProductKey.find({ productkey: key }).lean();
  console.log(productkey);
  if (!productkey || productkey?.length === 0)
    return res.status(400).json({ message: "Invalid Product Key" });
  return res.json(productkey);
};

module.exports = {
  readtoDB,
  getKeyDetails,
};
