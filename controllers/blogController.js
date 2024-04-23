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

exports.updateBlogPost = async (req, res, next) => {
  const id = req.params.id;

  const blogPost = await BlogPost.findByPk(id);
  if (!blogPost)
    return res.status(404).json({
      success: false,
      message: "BlogPost with ID " + id + " Not Found",
    });

  await BlogPost.update(
    {
      title: req.body.title,
      content: req.body.content,
      image_url: req.body.image_url,
    },
    {
      where: {
        id: id,
      },
    }
  );

  const cat = await Category.findByPk(req.body.category_id);
  blogPost.addCategory(cat);

  res.json({ success: true, message: "Updated post with ID " + id });
};

exports.deleteBlogPost = async (req, res, next) => {
  const id = req.params.id;

  const blogPost = await BlogPost.findByPk(id);

  if (!blogPost)
    return res.status(404).json({
      success: false,
      message: "BlogPost with ID " + id + " Not Found",
    });

  const isMine = blogPost.userId === parseInt(req.user.id) ? true : false;

  if (!isMine)
    return res.status(401).json({
      success: false,
      message: "You are not authorised to delete this BlogPost",
    });

  await BlogPost.destroy({
    where: {
      id: id,
    },
  });

  res.json({
    success: true,
    message: "Deleted blogpost with ID" + id,
  });
};
