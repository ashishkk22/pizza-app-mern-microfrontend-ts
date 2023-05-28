const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports.authMiddleware = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const { TOKEN } = req.cookies;
    if (!TOKEN) {
      return res.status(401).json({
        message: 'Please login first',
      });
    }
    const { id } = jwt.verify(TOKEN, process.env.NX_JWT_SECRET);
    req.user = await userModel.findById(id).select('-password');
    if (req.user) {
      next();
    } else {
      return res.status(401).json({
        message: 'Not registered user',
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid token',
    });
  }
};
