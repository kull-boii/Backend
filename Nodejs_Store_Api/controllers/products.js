const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  // handling name property (doesnt match the exact)
  const { name, sort } = req.query;
  if (name) {
    req.query.name = {
      $regex: name,
      $options: "i",
    };
  }

  console.log(req.query);
  let result = Product.find(req.query);

  if (sort) {
    // user can pass multiple sort
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
