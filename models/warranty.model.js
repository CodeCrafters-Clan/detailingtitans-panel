const mongoose = require("mongoose");

// dealer details are not for detailing titans
// installer_coverage is a studio name..
// no relation with user..

const warrantySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productkey: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductKey",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
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
    // dealer_code: {
    //   type: String,
    // },
    // dealer_name: {
    //   type: String,
    // },
    // dealer_mobile: {
    //   type: String,
    // },
    // dealer_address: {
    //   type: String,
    // },
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
      unique: true,
    },
    vehicle_chassi_no: {
      type: String,
      required: true,
    },
    vehicle_installation_date: {
      type: String,
      required: true,
    },
    // ppf_coverage: {
    //   type: String,
    // },
    // tint_coverage: {
    //   type: String,
    // },
    // fusion_coverage: {
    //   type: String,
    // },
    installer_coverage: {
      type: String,
    },
    installer_by: {
      type: String,
    },
    // installer_customer_id: {
    //   type: String,
    // },
    photo1name: {
      type: String,
    },
    photo2name: {
      type: String,
    },
    photo3name: {
      type: String,
    },
    photo4name: {
      type: String,
    },
    photo5name: {
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
    // photo6: {
    //   type: String,
    // },
    comment: {
      type: String,
    },
    videolink: {
      type: String,
    },
    // dealer_status: {
    //   type: Boolean,
    //   default: false,
    // },
    // status: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Warranty", warrantySchema);
