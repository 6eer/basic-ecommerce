const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Cart = sequelize.define("carts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

module.exports = Cart;
