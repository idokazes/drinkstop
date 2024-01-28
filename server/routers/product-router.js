const { Router } = require("express");
const {
  ProductModel,
  productValidationSchema,
} = require("../models/product-model");
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");

const productRouter = Router();

// GET /products - returns all products
productRouter.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.send(products);
});

// POST /products - creates a new product
productRouter.post("/", verifyAuth, verifyAdmin, async (req, res) => {
  const productData = req.body;
  const result = productValidationSchema.validate(productData);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const product = new ProductModel(productData);
  await product.save();
  res.send(product);
});

// PUT /products/:id - updates a product
productRouter.put("/:id", verifyAuth, verifyAdmin, async (req, res) => {
  const productData = req.body;
  const result = productValidationSchema.validate(productData);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    productData,
    { new: true }
  );
  res.send(product);
});

// DELETE /products/:id - deletes a product
productRouter.delete("/:id", verifyAuth, verifyAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findByIdAndDelete(productId);
  res.send(product);
});

module.exports = { productRouter };
