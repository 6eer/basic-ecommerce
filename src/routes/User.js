const express = require("express");
const {
  getUsers,
  signUpUser,
  getUser,
  deleteUser,
  logInUser,
  logOutUser,
  getProfile,
  deleteProfile,
  updateProfile,
} = require("../controllers/User");

const { validate, auth, roleCheck } = require("../middleware/validate");
const {
  userSchema,
  userSchemaUpdate,
  userSchemaLogIn,
} = require("../schema/User");

const router = new express.Router();

router.get("/users/me", auth, getProfile); //USERS - SELLERS - ADMIN
router.get("/users", auth, roleCheck("admin"), getUsers); //ADMIN

router.post("/users", validate(userSchema), signUpUser); //USERS - SELLERS - ADMIN
router.post("/users/login", validate(userSchemaLogIn), logInUser); //USERS - SELLERS - ADMIN
router.post("/users/logout", auth, logOutUser); //USERS - SELLERS - ADMIN

//
router.delete("/users/me", auth, deleteProfile); //USERS - SELLERS - ADMIN
router.get("/users/:id", auth, roleCheck("admin"), getUser); //ADMIN
router.put("/users/me", auth, validate(userSchemaUpdate), updateProfile); //USERS - SELLERS - ADMIN
router.delete("/users/:id", auth, roleCheck("admin"), deleteUser); //ADMIN

module.exports = router;
