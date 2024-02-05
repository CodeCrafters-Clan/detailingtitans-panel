const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const studioController = require("../controllers/studio.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.route("/").post(studioController.createStudio);

router.use(verifyJWT);
router.route("/user/:userId").get(studioController.getUserStudio);
router.route("/:id").get(studioController.getStudio);
// .patch(studioController.updateStudio);

router.use(verifyAdmin);
router.route("/").get(studioController.getallStudios);
router.route("/:id").delete(studioController.deleteStudio);
router.route("/:id").post(studioController.approveStudio);

module.exports = router;
