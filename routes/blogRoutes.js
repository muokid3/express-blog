const express = require("express");
const blogController = require("../controllers/blogController");
//const auth = require("../middleware/auth");
const passport = require("passport");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const upload = require("../middleware/upload");

const router = express.Router();

// router.get(
//   "/blogs",
//   passport.authenticate("jwt", { session: false }),
//   blogController.getBlogPosts
// );

router.get("/blogs", function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    // if (err) {
    //   return next(err); // Will generate a 500 error
    // }
   
    if (!user) {
      // Custom error message for unauthorized access
      const err = new Error("Invalid email address or password");
      err.status = 401;
      return next(err);
    }
  })(req, res, next),
  blogController.getBlogPosts;
});

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
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Blog title is required"),
    body("content").notEmpty().withMessage("Blog content is required"),
    body("categoryId").notEmpty().withMessage("Category ID is required"),
  ],
  validate,
  blogController.createBlogPost
);
router.put(
  "/blog/:id",
  passport.authenticate("jwt", { session: false }),
  [
    param("id").isNumeric().withMessage("Invalid Blog ID provided"),
    body("title").trim().notEmpty().withMessage("Blog title is required"),
    body("content").trim().notEmpty().withMessage("Blog content is required"),
    body("categoryId").trim().notEmpty().withMessage("Category ID is required"),
  ],
  validate,
  blogController.updateBlogPost
);
router.delete(
  "/blog/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteBlogPost
);

module.exports = router;
