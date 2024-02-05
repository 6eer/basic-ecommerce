const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");

const Seller = sequelize.define("sellers", {
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
