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
  console.log("cartProducts", cartProducts);

  const outOfStockProducts = [];

  const order = {
    userId: req.user._id,
    items: req.body
      .map((item) => {
        console.log("item.productId", item.productId);
        const cartProduct = cartProducts.find((product) => {
          console.log("product._id", product._id.toString());
          return product._id.toString() == item.productId;
        });
        console.log("cartProduct", cartProduct);

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

module.exports = { orderRouter };
