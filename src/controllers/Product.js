const Product = require("../models/Product");
const Seller = require("../models/Seller");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductsBySeller = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const products = await Product.findAll({ where: { sellerId: sellerId } });

    return res.status(200).json(products);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, sellerId } = req.body;

    const seller = await Seller.findByPk(sellerId);

    if (!seller) {
      throw new HttpError("Not a valid Seller", 404);
    }

    const newProduct = await Product.create({
      name: name,
      price: price,
      stock: stock,
      description: description,
      sellerId: sellerId,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new HttpError("Product not found", 404);
    }

    return res.status(200).json(product);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new HttpError("Product not found", 404);
    }

    const { name, price, stock, description, sellerId } = req.body;

    const seller = await Seller.findByPk(sellerId);
    if (!seller) {
      throw new HttpError("Seller not found", 404);
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? price : product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.description =
      description !== undefined ? description : product.description;
    product.sellerId = sellerId;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id);

    if (!product) {
      throw new HttpError("Product not found", 404);
    }

    await Product.destroy({
      where: {
        id: id,
      },
    });
    return res
      .status(200)
      .json({ message: "The product was successfully removed" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
};
