const express = require("express");
const {
  getSeller,
  createSeller,
  deleteSeller,
} = require("../controllers/Seller");

const router = new express.Router();

router.get("/sellers", getSeller);
router.post("/sellers", createSeller);
router.delete("/sellers/:id", deleteSeller);

module.exports = router;
