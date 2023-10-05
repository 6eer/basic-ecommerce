const express = require("express");
const {
  getUsers,
  signUpUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/User");

const router = new express.Router();

router.get("/users", getUsers);
router.post("/users", signUpUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
