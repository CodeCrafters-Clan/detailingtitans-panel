const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    entity: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Otp", otpSchema);
