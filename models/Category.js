const Sequelize = require("sequelize");
const sequelize = require("../util/database");


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


module.exports = Category;
