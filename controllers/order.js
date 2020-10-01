const { Order, ProductCart } = require("../models/order");

//-----------------------------------------------------------

//GET ORDER USING PARAM
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in database",
        });
      }
      req.order = order;
      next();
    });
};

//-----------------------------------------------------------

//CREATE ORDER
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

//-----------------------------------------------------------

//GET ALL ORDER
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found",
        });
      }
      res.json(order);
    });
};

//-----------------------------------------------------------

//GET ORDER STATUS
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

//-----------------------------------------------------------

//UPDATE STATUS
exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: res.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
