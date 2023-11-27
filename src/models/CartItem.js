const Cart = require("./Cart");
const Product = require("./Product");
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const CartItem = sequelize.define("cartItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
    defaultValue: "Unknown",
  },
  productPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = CartItem;
