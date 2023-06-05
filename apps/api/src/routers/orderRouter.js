const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.route("/create").post(createOrder);
orderRouter.route("/").get(getOrders);

module.exports = orderRouter;
