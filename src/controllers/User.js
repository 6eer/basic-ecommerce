const User = require("../models/User");
const Cart = require("../models/Cart");
const Seller = require("../models/Seller");
const sequelize = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const signUpUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, password, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(
      {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
      { transaction },
    );

    await Cart.create({ userId: newUser.id }, { transaction });

    const payload = {
      userId: newUser.id,
    };

    const options = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    newUser.token = token;
    await newUser.save({ transaction });

    await transaction.commit();

    res.status(201).send({ token, newUser });
  } catch (error) {
    await transaction.rollback();
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpError("Unable to login", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpError("Unable to login", 400);
    }

    const payload = {
      userId: user.id,
    };

    const options = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    user.token = token;
    await user.save();

    return res.status(200).json({ user, message: "The login was succesfull" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const logOutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    return res.status(200).json({ message: "The logout was succesfull" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

//Get user by id (ADMIN)
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

//Equivalente al get user by id del admin, pero siendo user. Get Profile (USER)
const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get users (ADMIN). No tiene equivalencia para un user.
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
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

//delete User by id (ADMIN)
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

//delete Profile (USER)
const deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;

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

    console.log("llega aca?");

    await req.user.destroy();
    console.log("llega aca?");

    if (cart) {
      await cart.destroy();
    }
    console.log("llega aca?");

    if (seller) {
      await seller.destroy();
    }
    console.log("llega aca?");

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
  logInUser,
  logOutUser,
  getProfile,
  deleteProfile,
};
