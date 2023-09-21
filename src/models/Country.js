const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Country = sequelize.define("countries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Country;
