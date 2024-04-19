exports.getBlogPosts = (req, res, next) => {
  res.json({ message: "Getblogposts has been hit" });
};

exports.getBlogPost = (req, res, next) => {
  const id = req.params.id;
  res.json({ message: "Get post with ID: " + id });
};

exports.createBlogPost = (req, res, next) => {
  res.json({ message: "Create post", body: req.body });
};

exports.updateBlogPost = (req, res, next) => {
    const id = req.params.id;
  res.json({ message: "Update post with ID "+id, body: req.body });
};

exports.deleteBlogPost = (req, res, next) => {
  const id = req.params.id;
  res.json({ message: "Delete with ID" + id });
};
