const couponModel = require("../models/couponModel");

module.exports.getPaginatedCoupon = async (req, res) => {
  try {
    //getting the page and limit and setting default is not provided
    const pageOptions = {
      page: parseInt(req.query.page - 1, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    if (pageOptions.page <= 0) pageOptions.page = 0;
    if (pageOptions.limit <= 1) pageOptions.limit = 10;

    //counting total doc
    const totalDoc = await couponModel.count();
    const totalPages = Math.ceil(totalDoc / pageOptions.limit);
    const coupons = await couponModel
      .find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);

    return res.status(200).json({
      message: "coupon fetched successfully",
      coupons,
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

module.exports.createCoupon = async (req, res) => {
  const userId = req.user._id;
  const { couponName, percentage, status } = req.body;
  try {
    if (!userId || !couponName || !percentage || !status) {
      return res.status(400).json({
        message: "Please send the user id and coupon name to create it",
      });
    }

    const coupon = await couponModel.create({
      user: userId,
      name: couponName,
      percentage,
      status,
    });

    return res.status(200).json({
      message: "coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.updateCoupon = async (req, res) => {
  const { couponId, updatedName, updatedStatus, updatedPercentage } = req.body;
  try {
    if (!couponId || !updatedName) {
      return res.status(400).json({
        message: "Please send the user id and coupon name to update it",
      });
    }
    const coupon = await couponModel.updateOne(
      {
        _id: couponId,
      },
      {
        name: updatedName,
        status: updatedStatus,
        percentage: updatedPercentage,
      }
    );

    return res.status(200).json({
      message: "coupon updated successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports.deleteCoupon = async (req, res) => {
  const { couponId } = req.body;
  try {
    if (!couponId) {
      return res.status(400).json({
        message: "Please send the coupon to delete it",
      });
    }
    const coupon = await couponModel.deleteOne({
      _id: couponId,
    });

    return res.status(200).json({
      message: "coupon deleted successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
