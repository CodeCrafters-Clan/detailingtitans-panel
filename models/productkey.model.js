const mongoose = require("mongoose");

const productkeySchema = new mongoose.Schema(
  {
    productkey: {
      type: String,
      required: true,
      unique: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    warrantyStatus: {
      type: Boolean,
      default: false,
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
