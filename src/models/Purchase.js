const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Product = require("./Product");
const User = require("./User");

const Purchase = sequelize.define("purchases", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
    defaultValue: "Unknown",
  },
  productPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

//Un usuario puede tener muchas compras, una compra pertenece a un usuario.
User.hasMany(Purchase, { foreignKey: "userId" });
Purchase.belongsTo(User, { foreignKey: "userId" });

//Un producto puede estar en muchas compras, pero una compra tiene solo un producto.
Product.hasMany(Purchase, { foreignKey: "productId" });
Purchase.belongsTo(Product, { foreignKey: "productId" });

module.exports = Purchase;
