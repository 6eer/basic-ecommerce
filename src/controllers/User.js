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

    //newUser.token = token;
    //await newUser.save({ transaction });

    await transaction.commit();

    res
      .status(201)
      .send({ token, newUser, message: "The sign up was succesfull" });
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
    console.log(token);
    //user.token = token;
    //await user.save();

    return res
      .status(200)
      .json({ user, token, message: "The login was succesfull" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const logOutUser = async (req, res) => {
  try {
    // req.user.token = null;
    // await req.user.save();

    return res.status(200).json({ message: "The logout was succesfull" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    req.user.name = name !== undefined ? name : req.user.name;
    req.user.email = email !== undefined ? email : req.user.email;
    req.user.password =
      password !== undefined
        ? await bcrypt.hash(password, 10)
        : req.user.password;

    await req.user.save();

    res.status(200).json(req.user);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
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
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

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

    await req.user.destroy();

    if (cart) {
      await cart.destroy();
    }

    if (seller) {
      await seller.destroy();
    }

    res.status(200).json({ message: "The user was successfully removed" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  signUpUser,
  getUser,
  deleteUser,
  logInUser,
  logOutUser,
  getProfile,
  deleteProfile,
  updateProfile,
};
