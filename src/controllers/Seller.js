const Seller = require("../models/Seller");
const User = require("../models/User");
const Product = require("../models/Product");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getSeller = async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    return res.status(200).json(sellers);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {
  try {
    const { sales, userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    const newSeller = await Seller.create({
      userId: userId,
      sales: sales,
    });

    return res.status(201).json(newSeller);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const id = req.params.id;

    const seller = await Seller.findByPk(id);

    if (!seller) {
      throw new HttpError("Seller not found", 404);
    }

    await Product.destroy({
      where: {
        sellerId: id,
      },
    });

    await Seller.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "The seller was successfully removed" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getSeller,
  createSeller,
  deleteSeller,
};
