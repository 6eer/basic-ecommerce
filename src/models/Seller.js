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
      len: [1, 100],
    },
  },
  sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  country: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 100],
    },
    allowNull: false,
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
