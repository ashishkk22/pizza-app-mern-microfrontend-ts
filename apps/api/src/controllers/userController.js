const userModel = require("../models/userModel");

module.exports.addAddress = async (req, res) => {
  let userId = req.user._id;
  let { address, name } = req.body;
  //   const userId = req.user;
  try {
    //return if body doesn't contain required variable
    if (!userId) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const addObj = {
      name,
      address,
    };
    const updatedAddress = await userModel.updateOne(
      {
        _id: userId,
      },
      { $push: { address: addObj } }
    );
    return res.status(200).json({
      message: "Address added",
      updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.deleteAddress = async (req, res) => {
  let userId = req.user._id;
  let { address, name, id } = req.body;
  try {
    //return if body doesn't contain required variable
    if (!userId || !id) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const updatedAddress = await userModel.updateOne(
      {
        _id: userId,
      },
      { $pull: { address: { _id: id } } },
      { new: true, multi: true }
    );
    return res.status(200).json({
      message: "Address removed",
      updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.getAddress = async (req, res) => {
  let userId = req.user._id;
  try {
    //return if body doesn't contain required variable
    if (!userId) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.find({
      _id: userId,
    });
    const addresses = user[0].address;
    return res.status(200).json({
      message: "Address fetched",
      address: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
