const express = require("express");
const {
  getCarts,
  getCart,
  confirmPurchase,
  //  addProductToCart,
  //  getProducts1,
} = require("../controllers/Cart");

const { PurchaseSchema } = require("../schema/Purchase");

const { validate, auth } = require("../middleware/validate");

const router = new express.Router();

router.get("/carts", getCarts);
router.get("/carts/:userId", getCart);
router.post("/carts/purchase", auth, validate(PurchaseSchema), confirmPurchase);
//router.post("/carts/addProduct", addProductToCart);
//router.get("/carts/:cartId/products", getProducts1);
//router.post("/countries", createCountry);
//router.put("/countries/:id", updateCountry);
//router.delete("/countries/:id", deleteCountry);

module.exports = router;
