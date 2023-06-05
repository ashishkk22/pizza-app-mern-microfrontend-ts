const categoryModel = require("../models/categoryModel");

module.exports.getAllCategories = async (req, res) => {
  try {
    //getting the page and limit and setting default is not provided
    const pageOptions = {
      page: parseInt(req.query.page - 1, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    if (pageOptions.page <= 0) pageOptions.page = 0;
    if (pageOptions.limit <= 1) pageOptions.limit = 10;

    //counting total doc
    const totalDoc = await categoryModel.count();
    const totalPages = Math.ceil(totalDoc / pageOptions.limit);

    const categories = await categoryModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
      totalDoc,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
module.exports.getPaginatedCategory = async (req, res) => {
  try {
    //getting the page and limit and setting default is not provided
    const pageOptions = {
      page: parseInt(req.query.page - 1, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    if (pageOptions.page <= 0) pageOptions.page = 0;
    if (pageOptions.limit <= 1) pageOptions.limit = 10;

    //counting total doc
    const totalDoc = await categoryModel.count();
    const totalPages = Math.ceil(totalDoc / pageOptions.limit);

    const categories = await categoryModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
      totalDoc,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.createCategory = async (req, res) => {
  const userId = req.user._id;
  const { categoryName, status } = req.body;
  try {
    if (!userId || !categoryName) {
      return res.status(400).json({
        message: "Please send the user id and category name to create it",
      });
    }

    const category = await categoryModel.create({
      user: userId,
      name: categoryName,
      status,
    });

    return res.status(200).json({
      message: "category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.updateCategory = async (req, res) => {
  const { categoryId, updatedName, updatedStatus } = req.body;
  try {
    if (!categoryId || !updatedName) {
      return res.status(400).json({
        message: "Please send the user id and category name to update it",
      });
    }
    const category = await categoryModel.updateOne(
      {
        _id: categoryId,
      },
      { name: updatedName, status: updatedStatus }
    );

    return res.status(200).json({
      message: "category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  try {
    if (!categoryId) {
      return res.status(400).json({
        message: "Please send the categoryId to delete it",
      });
    }
    const category = await categoryModel.deleteOne({
      _id: categoryId,
    });

    return res.status(200).json({
      message: "category deleted successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
