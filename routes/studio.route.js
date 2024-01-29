const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const studioController = require("../controllers/studio.controller");

router.use(verifyJWT);
router
  .route("/")
  .get(studioController.getallStudios)
  .post(studioController.createStudio)
  .patch(studioController.updateStudio)
  .delete(studioController.deleteStudio);

router.route("/:id").get(studioController.getStudio);

module.exports = router;
