const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Rol = sequelize.define("rols", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Rol;
