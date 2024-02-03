const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const warrantyController = require("../controllers/warranty.controller");

router.use(verifyJWT);
router
  .route("/")
  .get(warrantyController.getallWarranties)
  .post(warrantyController.createWarranty)
  .patch(warrantyController.updateWarranty)
  .delete(warrantyController.deleteWarranty);

router.route("/:id").get(warrantyController.getWarranty);

module.exports = router;
