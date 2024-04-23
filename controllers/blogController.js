const User = require("../models/User");
const Category = require("../models/Category");
const BlogPost = require("../models/BlogPost");

exports.getBlogPosts = async (req, res, next) => {
  const posts = await BlogPost.findAll({
    include: [{ model: User }],
  });
  res.json({
    success: true,
    posts,
  });
};

exports.getBlogPost = async (req, res, next) => {
  const id = req.params.id;
  const post = await BlogPost.findByPk(id, { include: [{ model: User }] });

  res.json({ success: true, post });
};

exports.createBlogPost = async (req, res, next) => {
  const fields = {
    title: req.body.title,
    content: req.body.content,
    image_url: req.body.image_url,
  };
  const blog = await BlogPost.create(fields);

  const user = await User.findByPk(parseInt(req.user.id));
  const category = await Category.findByPk(req.body.categoryId);

  blog.setUser(user);
  blog.addCategory(category);

  res.status(201).json({
    success: true,
    blog,
  });
};

exports.updateBlogPost = (req, res, next) => {
  const id = req.params.id;
  res.json({ message: "Update post with ID " + id, body: req.body });
};

exports.deleteBlogPost = (req, res, next) => {
  const id = req.params.id;
  res.json({ message: "Delete with ID" + id });
};
