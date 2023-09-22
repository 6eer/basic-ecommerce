const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");

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

Cart.belongsToMany(Product, {
  through: "CartItem",
  foreignKey: "cartId",
});

Product.belongsToMany(Cart, {
  through: "CartItem",
  foreignKey: "productId",
});

module.exports = Cart;
