const User = require("../models/User");
const Cart = require("../models/Cart");
const Seller = require("../models/Seller");
const sequelize = require("../database/database");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signUpUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create(
      {
        name: name,
        email: email,
        password: password,
      },
      { transaction },
    );

    await Cart.create({ userId: newUser.id }, { transaction });

    await transaction.commit();

    res.json(newUser);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const { name, email, password } = req.body;
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({
      where: {
        userId: id,
      },
    });

    const seller = await Seller.findOne({
      where: {
        userId: id,
      },
    });

    await user.destroy();

    if (cart) {
      await cart.destroy();
    }

    if (seller) {
      await seller.destroy();
    }

    res.status(200).json({ message: "The user was successfully removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  signUpUser,
  getUser,
  updateUser,
  deleteUser,
};
