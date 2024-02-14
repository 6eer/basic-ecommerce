const express = require("express");
const {
  getPurchaseItems,
  getPurchasetemsByUserId,
  deleleteAllPurchases,
} = require("../controllers/Purchase");

const { auth } = require("../middleware/validate");

const router = new express.Router();

router.get("/purchases/get", auth, getPurchaseItems);
router.get("/purchases/getPurchaseElements", auth, getPurchasetemsByUserId);
router.delete("/purchases/del", auth, deleleteAllPurchases);

module.exports = router;
