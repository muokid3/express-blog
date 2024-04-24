const express = require("express");
const blogController = require("../controllers/blogController");
const auth = require("../middleware/auth");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/blog", blogController.getBlogPosts);
router.get(
  "/blog/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("Blog ID is missing")
      .isNumeric()
      .withMessage("Invalid blog ID"),
  ],
  validate,
  blogController.getBlogPost
);
router.post(
  "/blog",
  auth,
  [
    body("title").notEmpty().withMessage("Blog title is required"),
    body("content").notEmpty().withMessage("Blog content is required"),
    body("image_url").notEmpty().withMessage("Image URL is required"),
    body("categoryId").notEmpty().withMessage("Category ID is required"),
  ],
  validate,
  blogController.createBlogPost
);
router.put(
  "/blog/:id",
  auth,
  [
    param("id").isNumeric().withMessage("Invalid Blog ID provided"),
    body("title").trim().notEmpty().withMessage("Blog title is required"),
    body("content").trim().notEmpty().withMessage("Blog content is required"),
    body("categoryId").trim().notEmpty().withMessage("Category ID is required"),
  ],
  validate,
  blogController.updateBlogPost
);
router.delete("/blog/:id", auth, blogController.deleteBlogPost);

module.exports = router;
