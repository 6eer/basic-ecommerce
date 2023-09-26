const Country = require("../models/Country");

const getCountry = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const newCountry = await Country.create({
      name: name,
    });

    res.json(newCountry);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findByPk(id);

    if (!country) {
      throw new Error("Country not found");
    }

    const { name } = req.body;
    country.name = name;

    await country.save();

    res.json(country);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;

    const country = await Country.findByPk(id);

    if (!country) {
      throw new Error("Country not found");
    }

    await Country.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "The country was successfully removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
