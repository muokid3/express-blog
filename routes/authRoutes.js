const express = require("express");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/auth/login",
  [
    check("email")
      .trim()
      .notEmpty()
      .withMessage("E-Mail is required")
      .isEmail()
      .withMessage("Provide a valid E-Mail"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Please provide a password"),
  ],
  validate,
  authController.login
);
router.post(
  "/auth/signup",
  [
    check("first_name").trim().notEmpty().withMessage("First Name is required"),
    check("last_name").trim().notEmpty().withMessage("Last Name is required"),
    check("email")
      .trim()
      .notEmpty()
      .withMessage("E-Mail is required")
      .isEmail()
      .withMessage("Provide a valid E-mail address"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Please provide a password"),
  ],
  authController.signup
);

module.exports = router;
