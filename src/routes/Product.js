const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");

const router = new express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
