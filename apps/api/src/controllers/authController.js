const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { sendMail } = require('../utilities/mailSend');

//signup user
module.exports.userSignUp = async (req, res) => {
  let { name, email, password, photo } = req.body;
  photo = photo ?? 'https://robohash.org/pizza-appa';
  console.log(name, email, password, photo);
  try {
    //return if body doesn't contain required variable
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all the fields',
      });
    }

    //if registered then check activate or not
    const userRegistered = await userModel.findOne({ email: email });

    if (userRegistered?.activated === false) {
      await userModel.deleteOne({ email: email });
    } else if (userRegistered) {
      return res.status(400).json({
        message: 'User already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let data = await userModel.create({
      name,
      email,
      password: hashedPassword,
      photo,
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    const timeToExpire = process.env.NX_EXPIRE_OTP * 60 * 1000;
    const expires = Date.now() + timeToExpire;
    const emailData = {
      otp,
      name,
      email,
      photo,
    };
    console.log(emailData);
    const str = 'otp';
    // const mailSend = await sendMail(str, emailData);
    const strForHash = `${email}.${otp}.${expires}`;
    const hash = await bcrypt.hash(strForHash, 10);
    const fullHash = `${hash}.${expires}`;
    return res.status(200).json({
      message: 'Please verify you email id with sended otp',
      email,
      hash: fullHash,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//verify the user with the sended otp
module.exports.verifyUser = async function verifyUser(req, res) {
  const { email, hash: fullHash, otp } = req.body;
  // const email = emailRaw.toLowerCase();
  try {
    if (!email || !fullHash || !otp) {
      return res.status(400).json({
        message: 'Please fill all the fields',
      });
    }

    let index = fullHash.lastIndexOf('.');
    let hash = fullHash.slice(0, index);
    let expires = fullHash.slice(index + 1);
    const isExpired = expires < Date.now();

    if (isExpired) {
      return res.status(400).json({
        message: 'OTP expired please try again',
      });
    }

    const data = `${email}.${otp}.${expires}`;
    const isValid = await bcrypt.compare(data, hash);

    if (!isValid) {
      return res.status(400).json({
        message: 'OTP is not valid',
      });
    }

    const userRegistered = await userModel.findOne({ email: email });
    if (!userRegistered) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    let updatedData = await userModel.updateOne(
      { email: userRegistered.email },
      { $set: { activated: true } }
    );

    userRegistered.activated = true;

    const token = jwt.sign(
      { id: userRegistered._id },
      process.env.NX_JWT_SECRET,
      {
        expiresIn: process.env.NX_JWT_EXPIRE,
      }
    );

    res.cookie('TOKEN', token, {
      expires: new Date(
        Date.now() + process.env.NX_JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: 'strict',
    });

    userRegistered.password = '__HIDDEN__';
    return res.status(200).json({
      message: 'User verified successfully',
      data: userRegistered,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      error,
    });
  }
};

//sign in user
module.exports.userSignIn = async function userSignIn(req, res) {
  let { email, password } = req.body;
  // let email = emailRaw.toLowerCase();
  console.log(email);
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please fill all the fields',
      });
    }

    const user = await userModel.findOne({ email: email });
    if (user.activated == false) {
      return res.status(400).json({
        message: 'Please verify your email id',
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign(
        { id: user._id },
        process.env.NX_JWT_SECRET,
        {
          expiresIn: process.env.NX_JWT_EXPIRE,
        }
      );
      res.cookie('TOKEN', token, {
        expires: new Date(
          Date.now() + process.env.NX_JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });
      user.password = '__HIDDEN__';
      return res.status(200).json({
        message: 'User signed in successfully',
        user,
      });
    } else {
      return res.status(400).json({
        message: 'wrong credentials',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      err,
    });
  }
};

//logout user
module.exports.userLogout = async function userLogout(req, res) {
  try {
    res.clearCookie('TOKEN');
    return res.status(200).json({
      message: 'User logged out successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//change password of user
module.exports.changePassword = async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      let data = await userModel.updateOne(
        { _id: req.user._id },
        { $set: { password: hashedPassword } }
      );
      return res.status(200).json({
        message: 'Password changed successfully',
      });
    } else {
      return res.status(400).json({
        message: 'Old password is wrong',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//forgot password of user
module.exports.forgotPassword = async function forgotPassword(req, res) {
  const { email: emailRaw } = req.body;
  const email = emailRaw.toLowerCase();
  try {
    const user = await userModel
      .findOne({ email: email })
      .select('-password -_id');
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    if (user?.activated == false) {
      return res.status(400).json({
        message: 'Please verify your email id',
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const timeToExpire = process.env.NX_EXPIRE_OTP * 60 * 1000;
    const expires = Date.now() + timeToExpire;
    const emailData = {
      otp,
      name: user.name,
      email: user.email,
    };
    const str = 'forgotPassword';
    // const mailSend = await sendMail(str, emailData);
    console.log(emailData);
    const hash = await bcrypt.hash(`${user.email}.${otp}.${expires}`, 10);
    const fullHash = `${hash}.${expires}`;
    return res.status(200).json({
      message: 'OTP send successfully',
      email: user.email,
      fullHash,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// forgot password otp verify
module.exports.forgotPassVerify = async function forgotPassVerify(req, res) {
  const { email: emailRaw, fullHash, otp, password } = req.body;
  const email = emailRaw.toLowerCase();
  try {
    if (!email || !fullHash || !otp || !password) {
      return res.status(400).json({
        message: 'Please fill all the fields',
      });
    }
    let index = fullHash.lastIndexOf('.');
    let hash = fullHash.slice(0, index);
    let expires = fullHash.slice(index + 1);
    const isExpired = expires < Date.now();
    if (isExpired) {
      return res.status(400).json({
        message: 'OTP expired',
      });
    }
    const data = `${email}.${otp}.${expires}`;
    const isValid = await bcrypt.compare(data, hash);
    if (!isValid) {
      return res.status(400).json({
        message: 'OTP is not valid',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    return res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//is authenticated or not
module.exports.isAuthenticated = async function isAuthenticated(req, res) {
  try {
    const { TOKEN } = req.cookies;
    if (!TOKEN) {
      return res.status(401).json({
        message: 'Please login ',
      });
    }
    const { id } = jwt.verify(TOKEN, process.env.NX_JWT_SECRET);
    const user = await userModel.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    } else {
      return res.status(201).json({
        message: 'registered user',
        user,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Please login to continue',
    });
  }
};

//update user details
module.exports.updateUserDetails = async function updateUserDetails(req, res) {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all the fields',
      });
    }
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    if (email != user.email) {
      const userExists = await userModel.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({
          message: 'User already exists',
        });
      }
    }
    const updatedData = await userModel.updateOne(
      { _id: req.userId },
      { $set: { name: name, email: email, password: password } }
    );
    user.password = '__HIDDEN__';
    return res.status(200).json({
      message: 'User details updated successfully',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
