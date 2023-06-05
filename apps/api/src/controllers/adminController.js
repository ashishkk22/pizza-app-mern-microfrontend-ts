const orderModel = require("../models/orderModel");

module.exports.getOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    //getting the page and limit and setting default is not provided
    const pageOptions = {
      page: parseInt(req.query.page - 1, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    if (pageOptions.page <= 0) pageOptions.page = 0;
    if (pageOptions.limit <= 1) pageOptions.limit = 10;

    //counting total doc
    const totalDoc = await orderModel.count();

    //getting the totalPages
    const totalPages = Math.ceil(totalDoc / pageOptions.limit);

    //getting the orders
    const orders = await orderModel
      .find()
      .sort({ _id: -1 })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    return res.status(200).json({
      message: "order fetched successfully",
      orders,
      totalDoc,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.statusUpdate = async (req, res) => {
  const { orderId, changedStatus } = req.body;
  try {
    if (!orderId || !changedStatus) {
      return res.status(400).json({
        message: "please enter all the fields",
      });
    }
    const orderUpdate = await orderModel.updateOne(
      { _id: orderId },
      { $set: { status: changedStatus } }
    );
    if (!orderUpdate.acknowledged) {
      return res.status(404).json({
        message: "order not found",
      });
    }
    return res.status(200).json({
      message: "order status updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
