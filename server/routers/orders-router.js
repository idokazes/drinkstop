const { Router } = require("express");
const { orderValidationSchema, OrderModel } = require("../models/order-model");
const { verifyAuth } = require("../middlewares/auth");
const { ProductModel } = require("../models/product-model");
const { UserModel } = require("../models/user-model");

const orderRouter = Router();

orderRouter.post("/", verifyAuth, async (req, res) => {
  const cartProducts = await ProductModel.find({
    _id: { $in: req.body.map((item) => item.productId) },
  });

  const order = {
    userId: req.user._id,
    items: req.body.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: cartProducts.find((product) => product._id == item.productId)
        .price,
    })),
  };

  const result = orderValidationSchema.validate(order);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  try {
    const newOrder = await OrderModel.create(order);
    const user = await UserModel.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.send(newOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

orderRouter.get("/", verifyAuth, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user._id });
    res.send(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = { orderRouter };