const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");

const Seller = sequelize.define("sellers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Seller.hasMany(Product, {
  foreignKey: "sellerId",
  allowNull: false,
});

Product.belongsTo(Seller, {
  allowNull: false,
});

module.exports = Seller;
