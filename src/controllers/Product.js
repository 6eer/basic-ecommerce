const Product = require("../models/Product");
const Seller = require("../models/Seller");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, sellerId } = req.body;

    const seller = await Seller.findByPk(sellerId);

    if (!seller) {
      throw new Error("Seller does not exist");
    }

    const newProduct = await Product.create({
      name: name,
      price: price,
      stock: stock,
      description: description,
      sellerId: sellerId,
    });

    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const { name, price, stock, description } = req.body;
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.description = description;

    await product.save();

    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "The product was successfully removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
