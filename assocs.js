const User = require("./models/User");
const Category = require("./models/Category");
const BlogPost = require("./models/BlogPost");


module.exports = () => {
    User.hasMany(BlogPost);
    BlogPost.belongsTo(User);

    BlogPost.belongsToMany(Category, {
      through: "blog_category",
    });
    Category.belongsToMany(BlogPost, {
      through: "blog_category",
    });
}

    