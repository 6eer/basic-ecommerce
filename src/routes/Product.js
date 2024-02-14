const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
  getProductsBySellerByStock,
  getProductsBySellerByPriceLowToHigh,
  getProductsBySellerByPriceHighToLow,
} = require("../controllers/Product");
const { validate, validateParams } = require("../middleware/validate");
const { productSchema, productParamsSchema } = require("../schema/Product");

const router = new express.Router();

router.get("/products", getProducts);
router.get("/products-seller", getProductsBySeller);
router.get("/products-seller-stock", getProductsBySellerByStock);
router.get("/products-seller-lowprice", getProductsBySellerByPriceLowToHigh);
router.get("/products-seller-highprice", getProductsBySellerByPriceHighToLow);

router.get("/products/:id", validateParams(productParamsSchema), getProduct);
router.post("/products", validate(productSchema), createProduct);
router.put(
  "/products/:id",
  validateParams(productParamsSchema),
  validate(productSchema),
  updateProduct,
);
router.delete(
  "/products/:id",
  validateParams(productParamsSchema),
  deleteProduct,
);

module.exports = router;
