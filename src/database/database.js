const { Sequelize } = require("sequelize");

if (process.env.NODE_ENV === "production") {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    },
  );
  module.exports = sequelize;
} else if (process.env.NODE_ENV === "development") {
  const sequelize = new Sequelize(
    process.env.DB_NAME2,
    process.env.DB_ENGINE,
    process.env.DB_PASSWORD2,
    {
      host: process.env.DB_HOST2,
      dialect: process.env.DB_DIALECT,
    },
  );
  module.exports = sequelize;
}
