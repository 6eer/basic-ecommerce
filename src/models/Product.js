const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Review = require("./Review");
//const CartItem = require("./CartItem");

const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 10000],
    },
    defaultValue: "Unknown",
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // Permitir que la imagen sea nula si no está disponible
  },
});

Product.hasMany(Review, {
  foreignKey: "productId",
  allowNull: false,
});

Review.belongsTo(Product, {
  allowNull: false,
});

//Product.hasMany(CartItem, { foreignKey: "productId" });
//CartItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = Product;
