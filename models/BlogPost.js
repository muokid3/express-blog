const Sequelize = require("sequelize");
const sequelize = require("../util/database");
// const User = require("./User");
// const Category = require("./Category");

const BlogPost = sequelize.define(
  "blog_post",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.DataTypes.BIGINT,
    },
    image_url: {
      type: Sequelize.DataTypes.TEXT,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);



// BlogPost.belongsTo(User);

// BlogPost.belongsToMany(Category, {
//   through: "blog_category",
// });

module.exports = BlogPost;
