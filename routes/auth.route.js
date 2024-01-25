const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.route("/").post(authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").get(authController.logout);
router.route("/forgot-password").post(authController.forgotpassword);
router.route("/verify-token").post(authController.verifyToken);
router.route("/reset-password").post(authController.resetPassword);

module.exports = router;
