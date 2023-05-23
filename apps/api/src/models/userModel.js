const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'employee', 'partner'],
      default: 'user',
    },
    activated: {
      type: Boolean,
      default: false,
      required: true,
    },
    photo: {
      type: String,
      default: 'https://robohash.org/pizza-appa',
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
