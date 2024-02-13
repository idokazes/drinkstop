const { Router } = require("express");
const { orderValidationSchema, OrderModel } = require("../models/order-model");
const { verifyAuth, verifyAdmin } = require("../middlewares/auth");
const { ProductModel } = require("../models/product-model");
const { UserModel } = require("../models/user-model");

const orderRouter = Router();

orderRouter.post("/", verifyAuth, async (req, res) => {
  const cartProducts = await ProductModel.find({
    _id: { $in: req.body.map((item) => item.productId) },
  });

  const outOfStockProducts = [];

  const order = {
    userId: req.user._id,
    items: req.body
      .map((item) => {
        const cartProduct = cartProducts.find((product) => {
          return product._id.toString() == item.productId;
        });

        if (!cartProduct) {
          return null;
        }

        if (cartProduct.stock < item.quantity) {
          outOfStockProducts.push(cartProduct.name);
        }

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: cartProduct.price,
        };
      })
      .filter(Boolean),
  };

  if (outOfStockProducts.length > 0) {
    return res
      .status(400)
      .send(`Out of stock products: ${outOfStockProducts.join(", ")}`);
  }

  const result = orderValidationSchema.validate(order);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  try {
    const newOrder = await OrderModel.create(order);
    const user = await UserModel.findById(req.user._id);
    user.cart = [];
    await user.save();

    await ProductModel.bulkWrite(
      order.items.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { stock: -item.quantity } },
        },
      }))
    );

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

orderRouter.get("/all", verifyAuth, verifyAdmin, async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate({
        path: "userId",
        select: "fullName imageUrl",
      })
      .populate({
        path: "items.productId",
        select: "name",
      });
    res.send(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = { orderRouter };
