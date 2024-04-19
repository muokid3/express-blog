const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const BlogPost = sequelize.define("blogpost", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.DataTypes.BIGINT,
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
});


module.exports = BlogPost;