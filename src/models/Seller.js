const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

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

module.exports = Seller;
