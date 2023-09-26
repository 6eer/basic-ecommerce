const Seller = require("../models/Seller");
const User = require("../models/User");
const Product = require("../models/Product");

const getSeller = async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    res.json(sellers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {
  try {
    const { sales, userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("userId does not exist");
    }

    const newSeller = await Seller.create({
      userId: userId,
      sales: sales,
    });

    res.json(newSeller);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const id = req.params.id;

    const seller = await Seller.findByPk(id);

    if (!seller) {
      throw new Error("Seller not found");
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
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSeller,
  createSeller,
  deleteSeller,
};
