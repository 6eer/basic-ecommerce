const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("e-commerce", "postgres", "Ff40554989", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;