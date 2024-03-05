const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otp.controller");

router.route("/").post(otpController.sendOtp);
router.route("/verify-otp").post(otpController.verifyOtp);

module.exports = router;
