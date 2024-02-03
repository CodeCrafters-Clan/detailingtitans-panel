const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const studioController = require("../controllers/studio.controller");

router.route("/").post(studioController.createStudio);

router.use(verifyJWT);

router
  .route("/")
  .get(studioController.getallStudios)
  .patch(studioController.updateStudio);

router.route("/:id").delete(studioController.deleteStudio);
router.route("/:id").post(studioController.approveStudio);
router.route("/:id").get(studioController.getStudio);

module.exports = router;
