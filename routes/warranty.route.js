const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const warrantyController = require("../controllers/warranty.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.use(verifyJWT);
router.route("/user/:userId").get(warrantyController.getUserWarranties);
router.route("/:id").get(warrantyController.getWarranty);
router.route("/").post(warrantyController.createWarranty);
router.route("/checkWarranty/:vehNo").get(warrantyController.checkWarranty);

router.use(verifyAdmin);
router.route("/").get(warrantyController.getallWarranties);
router.route("/").delete(warrantyController.deleteWarranty);
router.route("/:id").post(warrantyController.approveWarranty);
// .patch(warrantyController.updateWarranty)

module.exports = router;
