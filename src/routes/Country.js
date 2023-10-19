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
