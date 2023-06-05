const orderModel = require("../models/orderModel");

module.exports.createOrder = async (req, res) => {
  let userId = req.user._id;
  let {
    items,
    discount,
    cartTotalQty,
    totalPrice,
    discountedPrice,
    address,
    paymentType,
    comment,
  } = req.body;

  try {
    //return if body doesn't contain required variable
    if (
      !userId ||
      !items ||
      !cartTotalQty ||
      !address ||
      !paymentType ||
      !comment
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const orderCreated = await orderModel.create({
      customerId: userId,
      items,
      discount,
      cartTotalQty,
      totalPrice,
      discountedPrice,
      address,
      paymentType,
      comment,
    });
    return res.status(200).json({
      message: "order created",
      orderCreated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
      .find({ customerId: userId })
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
