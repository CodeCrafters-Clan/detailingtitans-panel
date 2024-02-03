const express = require("express");
const userController = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.route("/").post(userController.createUser);

router.use(verifyJWT);

router
  .route("/")
  .get(userController.getallUsers)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
