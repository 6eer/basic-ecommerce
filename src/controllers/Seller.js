const Seller = require("../models/Seller");
//const User = require("../models/User");
const Product = require("../models/Product");
const Country = require("../models/Country");

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

/*
const getSellerByCountry = async (req, res) => {
  try {
    const country = req.query.country;
    const sellers = await Seller.findAll({ where: { country: country } });

    return res.status(200).json(sellers);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};
*/

const getSellerByCountryId = async (req, res) => {
  try {
    const countryId = req.query.countryId;
    const sellers = await Seller.findAll({
      where: { countryId: countryId },
      order: [["name", "ASC"]],
    });

    return res.status(200).json(sellers);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {
  try {
    const { name, sales, country, countryId } = req.body;

    const country2 = await Country.findByPk(countryId);

    if (!country2) {
      throw new HttpError("Not a valid CountryID", 404);
    }

    const newSeller = await Seller.create({
      name: name,
      country: country,
      sales: sales,
      countryId: countryId,
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
  //getSellerByCountry,
  getSellerByCountryId,
  createSeller,
  deleteSeller,
};
