const { Router } = require("express");
const { ProductModel } = require("../models/product-model");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.send(products);
});

module.exports = { productRouter };
