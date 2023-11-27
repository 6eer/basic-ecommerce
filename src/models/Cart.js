const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
//const Product = require("./Product");
//const CartItem = require("./CartItem");

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

//Cart.hasMany(CartItem, { foreignKey: "cartId" });
//CartItem.belongsTo(Cart, { foreignKey: "cartId" });

module.exports = Cart;

/*
Cart.belongsToMany(Product, {
  through: "CartItem",
  foreignKey: "cartId",
});

Product.belongsToMany(Cart, {
  through: "CartItem",
  foreignKey: "productId",
});
*/
