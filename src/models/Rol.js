const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./User");

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

Rol.hasMany(User, {
  foreignKey: "rolId",
  allowNull: false,
});

User.belongsTo(Rol, {
  allowNull: false,
});

module.exports = Rol;
