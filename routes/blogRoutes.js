const express = require("express");
const blogController = require("../controllers/blogController");
const auth = require("../util/auth");

const router = express.Router();

router.get("/blog", blogController.getBlogPosts);
router.get("/blog/:id", blogController.getBlogPost);
router.post("/blog", auth, blogController.createBlogPost);
router.put("/blog/:id", auth, blogController.updateBlogPost);
router.delete("/blog/:id", auth, blogController.deleteBlogPost);

module.exports = router;
