const Purchase = require("../models/Purchase");
const User = require("../models/User");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getPurchaseItems = async (req, res) => {
  try {
    const purchaseItems = await Purchase.findAll();
    return res.status(200).json(purchaseItems);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getPurchasetemsByUserId = async (req, res) => {
  try {
    const id = req.user.id;

    const existingUser = await User.findOne({
      where: { id: id },
    });

    if (!existingUser) {
      throw new HttpError("User not found", 404);
    }

    const purchaseItemsExistingUser = await Purchase.findAll({
      where: { userId: id },
    });

    return res.status(200).json(purchaseItemsExistingUser);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const deleleteAllPurchases = async (req, res) => {
  try {
    await Purchase.destroy({ where: {} });
    return res
      .status(200)
      .json({ message: "All purchases have been successfully deleted" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getPurchaseItems,
  getPurchasetemsByUserId,
  deleleteAllPurchases,
};
