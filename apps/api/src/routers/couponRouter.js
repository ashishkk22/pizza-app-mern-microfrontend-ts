const express = require("express");
const {
  getPaginatedCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const { adminMiddleware } = require("../middlewares/admin-middleware");

const couponRouter = express.Router();

couponRouter.route("/").get(getPaginatedCoupon);
couponRouter.route("/create").post(adminMiddleware, createCoupon);
couponRouter.route("/update").post(adminMiddleware, updateCoupon);
couponRouter.route("/delete").post(adminMiddleware, deleteCoupon);

module.exports = couponRouter;
