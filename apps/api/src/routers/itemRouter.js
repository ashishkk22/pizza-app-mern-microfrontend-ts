const express = require("express");
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getProductByCategoryName,
} = require("../controllers/itemController");
const { adminMiddleware } = require("../middlewares/admin-middleware");

const itemRouter = express.Router();

itemRouter.route("/").get(getItems);
itemRouter.route("/create").post(adminMiddleware, createItem);
itemRouter.route("/update").post(adminMiddleware, updateItem);
itemRouter.route("/delete").post(adminMiddleware, deleteItem);
itemRouter.route("/productByName").post(getProductByCategoryName);

module.exports = itemRouter;
