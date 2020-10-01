var express = require("express");
var router = express.Router();

//IMPORT AUTH
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//IMPORT VALIDATOR for check
const { check, validationResult } = require("express-validator");

//SIGNUP
router.post(
  "/signup",
  [
    check("name", "name should be at least 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 character").isLength({
      min: 3,
    }),
  ],
  signup
);

//SIGNIN
router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({
      min: 1,
    }),
  ],
  signin
);

//SIGNOUT
router.get("/signout", signout);

//EXPORT
module.exports = router;
