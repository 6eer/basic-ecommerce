const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./User");

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

Country.hasMany(User, {
  foreignKey: "countryId",
  allowNull: false,
});

User.belongsTo(Country, {
  allowNull: false,
});

module.exports = Country;
