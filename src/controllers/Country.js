const Country = require("../models/Country");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      order: [["name", "ASC"]],
    });
    return res.status(200).json(countries);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findByPk(id);

    if (!country) {
      throw new HttpError("Country not found", 404);
    }

    return res.status(200).json(country);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const createCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const country = await Country.findOne({ where: { name: name } });

    if (country) {
      throw new HttpError("Country already exist", 400);
    }

    const newCountry = await Country.create({
      name: name,
    });

    return res.status(201).json(newCountry);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findByPk(id);

    if (!country) {
      throw new HttpError("Country not found", 404);
    }

    const { name } = req.body;

    const countryExist = await Country.findOne({ where: { name: name } });

    if (countryExist) {
      throw new HttpError("Country already exist", 400);
    }

    country.name = name;

    await country.save();

    return res.status(200).json(country);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;

    const country = await Country.findByPk(id);

    if (!country) {
      throw new HttpError("Country not found", 404);
    }

    await Country.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "The country was successfully removed" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
