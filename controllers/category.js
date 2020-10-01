const Category = require("../models/category");

//-----------------------------------------------------------

//MIDDLEWARE GET CATEGORY ID EXTRACTING INFORMATION FROM PARAMETER
exports.getCategoryId = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

//-----------------------------------------------------------

//CREATE CATEGORY
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save Category",
      });
    }

    //GET DATA
    res.json({ category });
  });
};

//-----------------------------------------------------------

//GET CATEGORY
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

//-----------------------------------------------------------

//GET ALL CATEGORY
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Categories found",
      });
    }

    //GET DATA
    res.json(categories);
  });
};

//-----------------------------------------------------------

//UPDATE CATEGORY
exports.updateCategory = (req, res) => {
  console.log(req);
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};
//REMOVE CATEGORY
exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};
