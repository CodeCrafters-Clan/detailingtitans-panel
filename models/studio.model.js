const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    company_name: {
      type: String,
    },
    gst_number: {
      type: String,
    },
    gst_doc: {
      type: String,
    },
    gst_doc_name: {
      type: String,
    },
    pan_number: {
      type: String,
    },
    pan_doc: {
      type: String,
    },
    pan_doc_name: {
      type: String,
    },
    studio_doc: {
      type: String,
      required: true,
    },
    studio_doc_name: {
      type: String,
      required: true,
    },
    aadhar_number: {
      type: String,
      required: true,
    },
    aadhar_doc: {
      type: String,
      required: true,
    },
    aadhar_doc_name: {
      type: String,
      required: true,
    },
    user_doc: {
      type: String,
      required: true,
    },
    user_doc_name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    // status: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Studio", studioSchema);
