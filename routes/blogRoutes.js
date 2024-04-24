const express = require("express");
const blogController = require("../controllers/blogController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/blog", blogController.getBlogPosts);
router.get("/blog/:id", blogController.getBlogPost);
router.post(
  "/blog",
  auth,
  [
    check("title").notEmpty().withMessage("Blog title is required"),
    check("content").notEmpty().withMessage("Blog content is required"),
    check("image_url").notEmpty().withMessage("Image URL is required"),
    check("categoryId").notEmpty().withMessage("Category ID is required"),
  ],
  validate,
  blogController.createBlogPost
);
router.put(
  "/blog/:id",
  auth,
  [
    check("title").trim().notEmpty().withMessage("Blog title is required"),
    check("content").trim().notEmpty().withMessage("Blog content is required"),
    check("categoryId")
      .trim()
      .notEmpty()
      .withMessage("Category ID is required"),
  ],
  validate,
  blogController.updateBlogPost
);
router.delete("/blog/:id", auth, blogController.deleteBlogPost);

module.exports = router;
