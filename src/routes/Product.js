/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - sellerId
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated and auto-incremented ID of the Product. This property is a primary key.
 *         name:
 *           type: string
 *           description: The name of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *         stock:
 *           type: integer
 *           description: The stock quantity of the product.
 *         description:
 *           type: string
 *           description: The description of the product.
 *         createdAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the product was added.
 *         updatedAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the product was modificated.
 *         sellerId:
 *           type: integer
 *           description: The `sellerId` property is a foreign key that links to the ID of the seller
 *             in the database. It establishes a relationship between products and sellers.
 *             When creating or updating a product, provide the ID of the seller to associate
 *             the product with a specific seller.
 *       example:
 *         name: "Sample Product"
 *         price: 19.99
 *         stock: 100
 *         description: "This is a sample product."
 *         createdAt: "2023-09-25 19:47:02.346-03"
 *         updatedAt: "2023-09-25 20:47:02.346-03"
 *         sellerId: 10
 *
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: An array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Product");
const validate = require("../middleware/validate");
const productSchema = require("../schema/Product");

const router = new express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", validate(productSchema), createProduct);
router.put("/products/:id", validate(productSchema), updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
