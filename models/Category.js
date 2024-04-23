const Sequelize = require("sequelize");
const sequelize = require("../util/database");
// const BlogPost = require("./BlogPost");


const Category = sequelize.define("category", {
  id: {
    type: Sequelize.DataTypes.BIGINT,
    notNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: Sequelize.DataTypes.STRING,
    notNull: true,
  },
});


// Category.belongsToMany(BlogPost, {
//   through: "blog_category",
// });

module.exports = Category;
