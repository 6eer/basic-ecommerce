const express = require("express");
const {
  getUsers,
  signUpUser,
  getUser,
  updateUser,
  deleteUser,
  logInUser,
  logOutUser,
  getProfile,
  deleteProfile,
} = require("../controllers/User");

const { validate, auth } = require("../middleware/validate");
const { userSchema } = require("../schema/User");

const router = new express.Router();

router.get("/users/me", auth, getProfile);
router.get("/users", auth, getUsers);

//
router.post("/users", validate(userSchema), signUpUser);
router.post("/users/login", validate(userSchema), logInUser);
router.post("/users/logout", auth, logOutUser);
//
router.delete("/users/me", auth, deleteProfile);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
