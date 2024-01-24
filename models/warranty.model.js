const mongoose = require("mongoose");

const warrantySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productkey: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    dealer_code: {
      type: String,
    },
    dealer_name: {
      type: String,
    },
    dealer_mobile: {
      type: String,
    },
    dealer_address: {
      type: String,
    },
    vehicle_year: {
      type: String,
      required: true,
    },
    vehicle_make: {
      type: String,
      required: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    vehicle_number: {
      type: String,
      required: true,
    },
    vehicle_chassi_no: {
      type: String,
      required: true,
    },
    vehicle_installation_date: {
      type: String,
      required: true,
    },
    ppf_coverage: {
      type: String,
    },
    tint_coverage: {
      type: String,
    },
    fusion_coverage: {
      type: String,
    },
    installer_coverage: {
      type: String,
    },
    installer_by: {
      type: String,
    },
    installer_customer_id: {
      type: String,
    },
    photo1: {
      type: String,
    },
    photo2: {
      type: String,
    },
    photo3: {
      type: String,
    },
    photo4: {
      type: String,
    },
    photo5: {
      type: String,
    },
    photo6: {
      type: String,
    },
    comments: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    admin_status: {
      type: Boolean,
      default: false,
    },
    videolink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Warranty", warrantySchema);
