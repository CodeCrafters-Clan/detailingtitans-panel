const ProductKey = require("../models/productkey.model");
const data = {};

data.productkeys = require("../data/productkey.json");

const readtoDB = async (req, res) => {
  console.log(data.productkeys.length);
  let productkeyData = [],
    count = 0,
    notactive = 0;
  console.log(data.productkeys[0]);

  for (let i = 0; i < data.productkeys.length; i++) {
    if (data.productkeys[i].status === "taken") {
      count++;
      productkeyData.push({
        productkey: data.productkeys[i].productkey,
        status: true,
      });
    } else {
      notactive++;
      productkeyData.push({
        productkey: data.productkeys[i].productkey,
        status: false,
      });
    }
  }

  await ProductKey.insertMany(productkeyData);
  console.log(count, "   ", notactive);
  res.send({ message: "Done!!" });
};

module.exports = {
  readtoDB,
};
