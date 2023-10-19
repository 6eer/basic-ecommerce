const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");
const { validate, validateParams } = require("../middleware/validate");
const { productSchema, productParamsSchema } = require("../schema/Product");

const router = new express.Router();

router.get("/products", getProducts);
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
