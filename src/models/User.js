const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Seller = require("./Seller");
const Cart = require("./Cart");
const Review = require("./Review");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Seller, {
  foreignKey: "userId",
  allowNull: false,
});

Seller.belongsTo(User, {
  allowNull: false,
});

User.hasOne(Cart, {
  foreignKey: "userId",
  allowNull: false,
});

Cart.belongsTo(User, {
  allowNull: false,
});

User.hasMany(Review, {
  foreignKey: "userId",
  allowNull: false,
});

Review.belongsTo(User, {
  allowNull: false,
});

module.exports = User;
