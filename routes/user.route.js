const express = require("express");
const userController = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.use(verifyJWT);
router
  .route("/")
  .get(userController.getallUsers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
