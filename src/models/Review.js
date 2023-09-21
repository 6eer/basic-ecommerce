const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Review = sequelize.define("reviews", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descrption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Review;
