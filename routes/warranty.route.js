const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const warrantyController = require("../controllers/warranty.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.route("/verify-keytoken").post(warrantyController.verifykeyToken);
router.route("/keytoken-actions/:id").post(warrantyController.keyTokenActions);
router.route("/checkWarranty/:vehNo").get(warrantyController.checkWarranty);
router.route("/:id").get(warrantyController.getWarranty);

router.use(verifyJWT);
router.route("/user/:userId").get(warrantyController.getUserWarranties);
router.route("/").post(warrantyController.createWarranty);

router.use(verifyAdmin);
router.route("/").get(warrantyController.getallWarranties);
router.route("/:id").delete(warrantyController.deleteWarranty);
router.route("/:id").post(warrantyController.approveWarranty);
// .patch(warrantyController.updateWarranty)

module.exports = router;
