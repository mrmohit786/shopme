const express = require("express");
const router = express.Router();

//GET USER CONTROLLER
const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

//GET AUTH CONTROLLER
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//GET USER BY ID
router.param("userId", getUserById);

//GET USER
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//GET ALL USERS
router.get("/users", getAllUsers);

//UPDATE USER
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//GET USER PURCHASE LIST
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

//EXPORT ROUTER
module.exports = router;
