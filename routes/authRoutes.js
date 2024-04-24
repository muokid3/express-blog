const express = require("express");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/auth/login",
  [
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("E-Mail is required")
      .isEmail()
      .withMessage("Provide a valid E-Mail"),
    body("password").trim().notEmpty().withMessage("Please provide a password"),
  ],
  validate,
  authController.login
);
router.post(
  "/auth/signup",
  [
    body("first_name").trim().notEmpty().withMessage("First Name is required"),
    body("last_name").trim().notEmpty().withMessage("Last Name is required"),
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("E-Mail is required")
      .isEmail()
      .withMessage("Provide a valid E-mail address"),
    body("password").trim().notEmpty().withMessage("Please provide a password"),
  ],
  validate,
  authController.signup
);

module.exports = router;
