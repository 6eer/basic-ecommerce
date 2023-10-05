/**
 * @swagger
 * components:
 *
 *
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated and auto-incremented ID of the Country. This property is a primary key.
 *         name:
 *           type: string
 *           description: The name of the country.
 *         createdAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the country was added.
 *         updatedAt:
 *           type: string
 *           format: date
 *           readOnly: true
 *           description: The date the country was modificated.
 *
 *       example:
 *         id: 1
 *         name: "Sample Country"
 *         createdAt: "2023-09-25 19:47:02.346-03"
 *         updatedAt: "2023-09-25 20:47:02.346-03"
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
 *     NotFoundError-:
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Country not found"
 *
 *     CountryAlreadyExistError:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Country already exists"
 *
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
 *
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Country'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   post:
 *     summary: Create a new country
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the country.
 *                 example: "Sample Country"
 *             required:
 *               - name
 *
 *     responses:
 *       201:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Country'
 *
 *       400:
 *           description: Bad Request.
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - $ref: '#/components/responses/ValidateRequestErrorMissing'
 *                   - $ref: '#/components/responses/ValidateRequestErrorType'
 *                   - $ref: '#/components/responses/CountryAlreadyExistError'
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
 *                       - instancePath: "/name"
 *                         schemaPath: "#/properties/name/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "string"
 *                         message: "should be string"
 *                 alreadyExists:
 *                   value:
 *                       message: "Country already exists"
 *
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 * /countries/{countryId}:
 *
 *   get:
 *     summary: Get a country by id.
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the country to retrieve.
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Country'
 *       404:
 *        $ref: '#/components/responses/NotFoundError-'
 *
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update a country by id.
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the country to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the country.
 *                 example: "Name changed"
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Request was successful.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Country'
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
 *                   - $ref: '#/components/responses/CountryAlreadyExistError'
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
 *                       - instancePath: "/name"
 *                         schemaPath: "#/properties/name/type"
 *                         keyword: "type"
 *                         params:
 *                           type: "string"
 *                         message: "should be string"
 *                 alreadyExists:
 *                   value:
 *                       message: "Country already exists"
 *       404:
 *        $ref: '#/components/responses/NotFoundError-'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Delete a country by id.
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the country to update.
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
 *                 message: "The country was successfully removed"
 *       400:
 *        $ref: '#/components/responses/ValidateRequestErrorType'
 *       404:
 *        $ref: '#/components/responses/NotFoundError-'
 *       500:
 *        $ref: '#/components/responses/InternalServerError'
 */

const express = require("express");
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/Country");

const router = new express.Router();
const { validate, validateParams } = require("../middleware/validate");
const { countrySchema, countryParamsSchema } = require("../schema/Country");

router.get("/countries", getCountries);
router.get("/countries/:id", validateParams(countryParamsSchema), getCountry);
router.post("/countries", validate(countrySchema), createCountry);
router.put(
  "/countries/:id",
  validateParams(countryParamsSchema),
  validate(countrySchema),
  updateCountry,
);
router.delete(
  "/countries/:id",
  validateParams(countryParamsSchema),
  deleteCountry,
);

module.exports = router;
