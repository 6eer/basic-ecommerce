/**
 * @swagger
 * components:
 *
 *
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
 *         id: 1
 *         name: "Sample Product"
 *         price: 19.99
 *         stock: 100
 *         description: "This is a sample product."
 *         createdAt: "2023-09-25 19:47:02.346-03"
 *         updatedAt: "2023-09-25 20:47:02.346-03"
 *         sellerId: 10
 *
 *   responses:
 *     InternalServerError:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "An unexpected server error has occurred"
 *     NotFoundError:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Product not found"
 *     ValidateRequestErrorMissing:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         missingProperty:
 *                           type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: ""
 *                   schemaPath: "#/required"
 *                   keyword: "required"
 *                   params:
 *                     missingProperty: "name"
 *                   message: "must have required property 'name'"
 *
 *     ValidateRequestErrorType:
 *         description: Bad Request.
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     instancePath:
 *                       type: string
 *                     schemaPath:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     params:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                     message:
 *                       type: string
 *             example:
 *               errors:
 *                 - instancePath: "/id"
 *                   schemaPath: "#/properties/id/type"
 *                   keyword: "type"
 *                   params:
 *                     type: "integer"
 *                   message: "must be integer"
 *
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Sample Product"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 19.99
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product.
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *                 example: "This is a sample product."
 *               sellerId:
 *                 type: integer
 *                 description: The ID of the seller.
 *                 example: 10
 *             required:
 *               - name
 *               - sellerId
 *     responses:
 *       201:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Not a valid id Seller"
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorMissing'
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *               examples:
 *                 missingProperty:
 *                   value:
 *                     errors:
 *                       - instancePath: ""
 *                         schemaPath: "#/required"
 *                         keyword: "required"
 *                         params:
 *                           missingProperty: "name"
 *                         message: "must have required property 'name'"
 *                 wrongType:
 *                   value:
 *                     errors:
 *                       - instancePath: "/price"
 *                         schemaPath: "#/properties/price/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "number"
 *                         message: "should be number"
 *
 *
 * /products/{productId}:
 *
 *   get:
 *     summary: Get a product by id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 *
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *
 *   put:
 *     summary: Update a product by id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Name changed"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 19.99
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product.
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *                 example: "This is a sample product."
 *               sellerId:
 *                 type: integer
 *                 description: The ID of the seller.
 *                 example: 10
 *             required:
 *               - name
 *               - sellerId
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Product'
 *                 - type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Name changed"
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorMissing'
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *               examples:
 *                 missingProperty:
 *                   value:
 *                     errors:
 *                       - instancePath: ""
 *                         schemaPath: "#/required"
 *                         keyword: "required"
 *                         params:
 *                           missingProperty: "name"
 *                         message: "must have required property 'name'"
 *                 wrongType:
 *                   value:
 *                     errors:
 *                       - instancePath: "/price"
 *                         schemaPath: "#/properties/price/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "number"
 *                         message: "should be number"
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete a product by id.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update.
 *     responses:
 *       200:
 *         description:  Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "The product was successfully removed"
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *       404:
 *        $ref: '#/components/responses/NotFoundError'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 */

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
