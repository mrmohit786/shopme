//IMPORT USER MODEL
const User = require("../models/user");

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//IMPORT VALIDATIOR for validation result
const { check, validationResult } = require("express-validator");

//-----------------------------------------------------------

//EXPORT SIGNOUT FOR AUTH ROUTER
exports.signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "User signout successfully",
  });
};

//-----------------------------------------------------------

//EXPORT SIGNUP FOR AUTH ROUTER
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  //CREATE USER OBJECT
  const user = new User(req.body);

  //SAVE USER
  user.save((err, user) => {
    //CHECK ERROR
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }

    //REPONSE JSON
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//-----------------------------------------------------------

//EXPORT SIGNIN FOR AUTH ROUTER
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  //CHECK ERROR
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //FIND EMAIL
  User.findOne({ email }, (err, user) => {
    //CHECK EMAIL
    if (err || !user) {
      return res.status(400).json({
        error: "email does not exists",
      });
    }

    //CHECK PASSWORD
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password do not match",
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });

    //SEND RESPONSE TO FRONT END
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//-----------------------------------------------------------

//PROTECTED ROUTE MIDDLEWARE
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//CUSTOM MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }

  next();
};

//-----------------------------------------------------------

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access Denied",
    });
  }

  next();
};
