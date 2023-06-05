const itemModel = require("../models/itemModel");

module.exports.getItems = async (req, res) => {
  try {
    //getting the page and limit and setting default is not provided
    const pageOptions = {
      page: parseInt(req.query.page - 1, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    if (pageOptions.page <= 0) pageOptions.page = 0;
    if (pageOptions.limit <= 1) pageOptions.limit = 10;

    //counting total doc
    const totalDoc = await itemModel.count();
    const totalPages = Math.ceil(totalDoc / pageOptions.limit);
    const items = await itemModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    return res.status(200).json({
      message: "items fetched successfully",
      items,
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

module.exports.createItem = async (req, res) => {
  const userId = req.user._id;
  const {
    name,
    category,
    description,
    image,
    price,
    hit = false,
    publish = true,
    available = true,
  } = req.body;
  try {
    //checking all the required fields
    if (!userId || !name || !category || !description || !image || !price) {
      return res.status(400).json({
        message: "Please send the required fields !",
      });
    }

    const item = await itemModel.create({
      user: userId,
      name,
      category,
      description,
      available,
      hit,
      image,
      price,
      publish,
    });

    return res.status(200).json({
      message: "item created successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.updateItem = async (req, res) => {
  const userId = req.user._id;
  const {
    id,
    name,
    category,
    description,
    image,
    price,
    hit = false,
    publish = true,
    available = true,
  } = req.body;

  try {
    //checking all the required fields
    if (!userId || !name || !category || !description || !image || !price) {
      return res.status(400).json({
        message: "Please send the required fields !",
      });
    }

    const item = await itemModel.updateOne(
      {
        _id: id,
      },
      {
        user: userId,
        name,
        category,
        description,
        available,
        hit,
        image,
        price,
        publish,
      }
    );

    return res.status(200).json({
      message: "item updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.deleteItem = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Please send the item it to delete it",
      });
    }
    const item = await itemModel.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      message: "item deleted successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.getProductByCategoryName = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        message: "Please send the category to get the product",
      });
    }
    const items = await itemModel.find({
      category: name,
    });

    return res.status(200).json({
      message: "items fetched successfully",
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
