const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

require("dotenv").config();

exports.login = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordValid) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid password. Please try again",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "We could not find a user with the given credentials",
    });
  }
};

exports.signup = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);

  const exists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  const hashedPwd = await bcrypt.hash(req.body.password, salt);

  if (exists)
    return res.status(403).json({
      success: false,
      message: "The email has already been taken",
    });

  const createdUser = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPwd,
  });

  res.json({
    success: true,
    message: "Account created succesfully",
    user: createdUser,
  });
};
