const Country = require("../../src/models/Country");
const Product = require("../../src/models/Product");
const Seller = require("../../src/models/Seller");
const User = require("../../src/models/User");

const newUser1 = {
  id: 1,
  name: "TestingUser1",
  email: "testinguser1@gmail.com",
  password: "testing1",
};

const newSeller1 = {
  id: 10,
  userId: 1,
  sales: 10,
};

const newProduct1 = {
  id: 1,
  name: "TestProduct1",
  price: 23,
  stock: 200,
  description: "Testing product 1",
  sellerId: 10,
};

const newCountry = {
  id: 1,
  name: "TestCountry1",
};

const setupDatabase = async () => {
  await Product.destroy({
    where: {},
  });
  await User.destroy({
    where: {},
  });
  await Seller.destroy({
    where: {},
  });
  await Country.destroy({
    where: {},
  });
  await new User(newUser1).save();
  await new Seller(newSeller1).save();
  await new Product(newProduct1).save();
  await new Country(newCountry).save();
};

module.exports = {
  newUser1,
  newSeller1,
  newProduct1,
  setupDatabase,
  newCountry,
};
