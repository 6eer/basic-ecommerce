const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  getCartItemsByCartId,
  removeOneFromCart,
} = require("../controllers/CartItem");

const { cartItemSchema, cartItemDeleteSchema } = require("../schema/CartItem");

const { validate, auth } = require("../middleware/validate");

const router = new express.Router();

router.get("/cartitems/get", auth, getCartItems);
router.get("/cartitems/getCartElements", auth, getCartItemsByCartId);

router.post("/cartitems/add", auth, validate(cartItemSchema), addToCart);
router.delete(
  "/cartitems/del",
  auth,
  validate(cartItemDeleteSchema),
  removeFromCart,
);
router.delete(
  "/cartitems/delOne",
  auth,
  validate(cartItemDeleteSchema),
  removeOneFromCart,
);

module.exports = router;
