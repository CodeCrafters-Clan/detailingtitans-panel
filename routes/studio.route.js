const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const studioController = require("../controllers/studio.controller");

router
  .route("/")
  .get(studioController.getallStudios)
  .post(studioController.createStudio)
  .patch(studioController.updateStudio)
  .delete();

module.exports = router;
