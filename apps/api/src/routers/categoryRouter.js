const express = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getPaginatedCategory,
} = require("../controllers/categoryController");
const { adminMiddleware } = require("../middlewares/admin-middleware");
const categoryRouter = express.Router();

categoryRouter.route("/").get(getPaginatedCategory);
categoryRouter.route("/getAll").get(getAllCategories);
categoryRouter.route("/create").post(adminMiddleware, createCategory);
categoryRouter.route("/update").patch(adminMiddleware, updateCategory);
categoryRouter.route("/delete").post(adminMiddleware, deleteCategory);

module.exports = categoryRouter;
