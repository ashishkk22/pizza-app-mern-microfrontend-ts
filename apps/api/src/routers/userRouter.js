const express = require("express");
const {
  addAddress,
  deleteAddress,
  getAddress,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/addAddress").post(addAddress);
userRouter.route("/deleteAddress").post(deleteAddress);
userRouter.route("/getAddress").get(getAddress);

module.exports = userRouter;
