const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    return res.status(200).json(cartItems);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const getCartItemsByCartId = async (req, res) => {
  try {
    const id = req.user.id;

    const existingCart = await Cart.findOne({
      where: { userId: id },
    });

    if (!existingCart) {
      throw new HttpError("Cart not found", 404);
    }

    const cartItemsExistingCart = await CartItem.findAll({
      where: { cartId: existingCart.id },
    });

    //Esto es para que el available se actualice. Porque sino, si otro usuario compra algo, y tambien esta en el carrito de otro usuario, no alcanza con el cambio de cuenta, porq esto lo q hacia era traerse todos los cartitem q guarde en el momento q se agrego al carrito, tonces no cambiaba el stock cuando alguien compraba, ahora x cada uno antes de llevarlos al carrito cuando cambia el usuairo o se recarga la pagina se chequea de actualizar el stock.
    for (const cartItem of cartItemsExistingCart) {
      const product = await Product.findByPk(cartItem.productId);
      if (product) {
        cartItem.productStock = product.stock;
        await cartItem.save();
      }
    }

    return res.status(200).json(cartItemsExistingCart);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    //Cuando toco el boton ADD en el front, tengo que agregar a la request el productId y la cantidad.
    const {
      productId,
      productName,
      productPrice,
      productStock,
      quantity,
      productImageUrl,
    } = req.body;
    //Como la request pasa el auth, obtenemos el id del token.
    const id = req.user.id;

    //Obtengo el ID del carrito del usuario que hizo la request.
    //Verifico que en caso que pase el validate de middleware los datos del body (su formato), que ahora tengan una existencia en la BD.
    const existingCart = await Cart.findOne({
      where: { userId: id },
    });

    if (!existingCart) {
      throw new HttpError("Cart not found", 404);
    }

    const existingProduct = await Product.findOne({
      where: { id: productId },
    });
    if (!existingProduct) {
      throw new HttpError("Product not found", 404);
    }

    if (existingProduct.name !== productName) {
      throw new HttpError(
        "The product name does not match the product name in the database",
        404,
      );
    }

    if (existingProduct.price !== productPrice) {
      throw new HttpError(
        "The product price does not match the product price in the database",
        404,
      );
    }

    if (existingProduct.stock !== productStock) {
      throw new HttpError(
        "The product stock does not match the product stock in the database",
        404,
      );
    }

    const cartId = existingCart.id;

    // Verificar si ya existe un registro para este producto en el carrito
    const existingCartItem = await CartItem.findOne({
      where: { cartId: cartId, productId: productId },
    });

    // Si existe, no creamos otro sino que sumamos la cantidad.
    if (existingCartItem) {
      const finalQuantity = existingCartItem.quantity + quantity;

      //Si la cantidad que ya tenemos en el carrito, junto con la suma, supera la cantidad de stock. No se hace.
      if (finalQuantity > existingProduct.stock) {
        throw new HttpError("Not enough stock", 404);
      }

      // El producto ya está en el carrito, incrementar la cantidad
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(201).json(existingCartItem);
    } else {
      //Si no existe, antes de crearlo chequeamos que la cantidad solicitada no supera el stock.
      if (quantity > existingProduct.stock) {
        throw new HttpError("Not enough stock", 404);
      }

      // El producto no está en el carrito, crear un nuevo registro
      const newCartitem = await CartItem.create({
        cartId: cartId,
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        productStock: productStock,
        quantity: quantity,
        productImageUrl: productImageUrl,
      });
      return res.status(201).json(newCartitem);
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const id = req.user.id;

    //Obtengo el ID del carrito del usuario que hizo la request.
    const existingCart = await Cart.findOne({
      where: { userId: id },
    });

    if (!existingCart) {
      throw new HttpError("Cart not found", 404);
    }

    const existingProduct = await Product.findOne({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new HttpError("Product not found", 404);
    }

    const cartId = existingCart.id;

    const existingCartItem = await CartItem.findOne({
      where: { cartId: cartId, productId: productId },
    });

    if (!existingCartItem) {
      throw new HttpError("CartItem not found", 404);
    }
    await existingCartItem.destroy();

    res.status(200).json({ message: "The cartItem was successfully removed" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

const removeOneFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const id = req.user.id;

    //Obtengo el ID del carrito del usuario que hizo la request.
    const existingCart = await Cart.findOne({
      where: { userId: id },
    });

    if (!existingCart) {
      throw new HttpError("Cart not found", 404);
    }

    const existingProduct = await Product.findOne({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new HttpError("Product not found", 404);
    }

    const cartId = existingCart.id;

    const existingCartItem = await CartItem.findOne({
      where: { cartId: cartId, productId: productId },
    });

    if (!existingCartItem) {
      throw new HttpError("CartItem not found", 404);
    }

    //Si antes de borrar 1, vemos q habia solo 1 encargado, borramos el item entero.
    if (existingCartItem.quantity === 1) {
      await existingCartItem.destroy();
      return res
        .status(200)
        .json({ message: "The quantity was one, so the item was deleted" });
    }

    //Por las dudas si se da este caso.
    if (existingCartItem.quantity === 0) {
      throw new HttpError("The stock is already zero", 404);
    }

    //Si no cae en ninguno de los casos, disminuimos en 1 y guardamos.
    existingCartItem.quantity -= 1;
    await existingCartItem.save();

    res
      .status(200)
      .json({ message: "The quantity was decreased by one correctly" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  getCartItemsByCartId,
  removeOneFromCart,
};
