const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Review = require("./Review");

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
      len: [1, 100],
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
});

Product.hasMany(Review, {
  foreignKey: "productId",
  allowNull: false,
});

Review.belongsTo(Product, {
  allowNull: false,
});

module.exports = Product;
