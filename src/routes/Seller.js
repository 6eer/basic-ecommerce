const express = require("express");
const {
  getSeller,
  getSellerByCountry,
  createSeller,
  deleteSeller,
} = require("../controllers/Seller");

const router = new express.Router();

router.get("/sellers", getSeller);
router.get("/sellers-country", getSellerByCountry);
router.post("/sellers", createSeller);
router.delete("/sellers/:id", deleteSeller);

module.exports = router;
