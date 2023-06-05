const express = require("express");
const { getOrders, statusUpdate } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.route("/order").get(getOrders);
adminRouter.route("/order/statusUpdate").post(statusUpdate);

module.exports = adminRouter;
