const joi = require("joi");
const mongoose = require("mongoose");

const itemValidationSchema = joi.array().items({
  productId: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
});

const orderValidationSchema = joi.object({
  items: itemValidationSchema,
  userId: joi.string().required(),
});

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  items: { type: [orderItemSchema] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = { OrderModel, orderValidationSchema };
