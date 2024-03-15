const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const keyController = require("../controllers/productkey.controller");

// router.use(verifyJWT);
router.route("/").get(keyController.readtoDB);
router.route("/:key").get(keyController.getKeyDetails);
router.route("/").post(keyController.getAKey);

module.exports = router;
