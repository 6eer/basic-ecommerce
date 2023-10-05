const express = require("express");
const {
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/Country");

const router = new express.Router();

router.get("/countries", getCountry);
router.post("/countries", createCountry);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

module.exports = router;
