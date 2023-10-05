const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.body;

    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    await cart.addProduct(product);
    res.status(200).send("Product added to cart successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProducts1 = async (req, res) => {
  try {
    //console.log(req.body);
    //const { cartId } = req.body;
    //console.log(cartId);

    const { cartId } = req.params;
    console.log(cartId);

    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const products = await cart.getProducts();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//res.status(200).send("Product added to cart successfully");
module.exports = {
  getCarts,
  getCart,
  addProductToCart,
  getProducts1,
};
