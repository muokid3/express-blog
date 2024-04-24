const { Sequelize } = require("sequelize");
const seq = require("../util/database");

const User = seq.define(
  "user",
  {
    id: {
      type: Sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


module.exports = User;
