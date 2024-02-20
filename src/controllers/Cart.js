const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const Purchase = require("../models/Purchase");

//const Product = require("../models/Product");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    return res.status(200).json(carts);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
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
      throw new HttpError("Cart not found", 404);
    }

    return res.status(200).json(cart);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

//Controlador q es para cuando se hace la compra ---> tiene q borrar los cartitem con este cart id y tambien actualizar el stock de los productos q estan en el carrito

const confirmPurchase = async (req, res) => {
  try {
    //Obtengo el ID del user que hace la compra.
    const id = req.user.id;

    //Obtengo el carrito del user que hace la compra, para asi obtener el ID del cart y rastraer todos los cartItem q tienen ese cartId
    const existingCart = await Cart.findOne({
      where: { userId: id },
    });

    if (!existingCart) {
      throw new HttpError("Cart not found", 404);
    }

    //Obtengo todos los cartItem del carrito
    const existingCartItems = await CartItem.findAll({
      where: { cartId: existingCart.id },
    });

    if (!existingCartItems) {
      throw new HttpError("No cartItems found in the cart", 404);
    }

    if (existingCartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "You have no products on the cart" });
    }

    //Primero chequeo, que efectivamente el stock de TODOS los cartitems, sea menor o igual al stock que hay del producto.
    //Con que haya 1 que no se cumpla, no se hace. Esto es en caso q un usuario le haya quedado un producto agregado en el carrito y otro usuario compro y quizas no hay mas stock.
    const noStockProducts = [];
    for (const cartItem of existingCartItems) {
      const product = await Product.findByPk(cartItem.productId);
      if (cartItem.quantity > product.stock) {
        noStockProducts.push({
          productName: product.name,
          productStock: product.stock,
          quantity: cartItem.quantity,
        });
      }
    }

    if (noStockProducts.length > 0) {
      return res.status(400).json({
        message: "There are products that exceed the available stock.",
        noStockProducts,
      });
    }

    //Si los stock se respetan, Actualizo el stock de cada producto dentro del cart.
    for (const cartItem of existingCartItems) {
      const product = await Product.findByPk(cartItem.productId);
      if (product) {
        product.stock -= cartItem.quantity;
        await product.save();
      }
    }

    //Creo cada purchase y borro el cartItem
    for (const cartItem of existingCartItems) {
      await Purchase.create({
        date: new Date(),
        userId: id,
        productId: cartItem.productId,
        productName: cartItem.productName,
        productPrice: cartItem.productPrice,
        quantity: cartItem.quantity,
        productImageUrl: cartItem.productImageUrl,
      });
      await cartItem.destroy();
    }

    return res.status(200).json({ message: "The purchase was successful" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  getCarts,
  getCart,
  confirmPurchase,
};
