const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
//const Seller = require("./Seller");
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
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      //isLowercase: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [7, 100],
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
    validate: {
      isIn: [["user", "admin", "seller"]],
    },
  },
  //token: {
  //  type: DataTypes.STRING,
  //  allowNull: true,
  //},
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
