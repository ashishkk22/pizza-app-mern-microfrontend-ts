const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const TOKEN = req.headers.authorization?.split(" ")[1];
    if (!TOKEN) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    const { id } = jwt.verify(TOKEN, process.env.NX_JWT_SECRET);
    req.user = await userModel.findById(id).select("-password");
    if (req.user) {
      next();
    } else {
      return res.status(401).json({
        message: "Not registered user",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
