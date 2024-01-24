const mongoose = require("mongoose");

const productkeySchema = new mongoose.Schema(
  {
    productkey: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductKey", productkeySchema);
