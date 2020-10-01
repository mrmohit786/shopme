const User = require("../models/user");
const Order = require("../models/order");

//-----------------------------------------------------------

//GET USER BY ID
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: " No User Found",
      });
    }
    req.profile = user;
    next();
  });
};

//-----------------------------------------------------------
//GET USER
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.timestamps = undefined;

  return res.json(req.profile);
};

//-----------------------------------------------------------

//GET ALL USERs
exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No Users Found",
      });
    }

    res.json(users);
  });
};

//-----------------------------------------------------------

//UPDATE USER
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }

      //UNDEFINED BECAUSE TO HIDE IN FRONTEND
      user.salt = undefined;
      user.encry_password = undefined;

      //SHOW DATA
      res.json(user);
    }
  );
};

//-----------------------------------------------------------

//GET USER PURCHASE LIST
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }

      //SHOW DATA
      return res.json(order);
    });
};

//-----------------------------------------------------------

//PUT ORDER IN USER PURCHASE LIST
exports.pushOrderInPurchaseList = (req, res, next) => {
  //PURCHASE ARRAY
  let purchases = [];

  //PUT DATA IN PURCHASE ARRAY
  req.body.order.products.forEach((product) => {
    purchases.push({
      _if: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //UPDATE PURCHASE ARRAY IN DATABASE
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Purchase List",
        });
      }
      next();
    }
  );
};
