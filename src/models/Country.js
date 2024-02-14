const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./User");
const Seller = require("./Seller");

const Country = sequelize.define("countries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      min: 0,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 10000],
    },
  },
});

Country.hasMany(User, {
  foreignKey: "countryId",
  allowNull: false,
});

User.belongsTo(Country, {
  allowNull: false,
});

Country.hasMany(Seller, {
  foreignKey: "countryId",
  allowNull: false,
});

Seller.belongsTo(Country, {
  allowNull: false,
});

module.exports = Country;
