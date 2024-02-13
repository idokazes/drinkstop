const mongoose = require("mongoose");
const joi = require("joi");

const password = joi.string().required().min(8);

const userUpdatesValidationSchema = joi.object({
  fullName: joi.string().optional().min(3),
  email: joi.string().email().optional().min(5),
  imageUrl: joi.string().optional(),
  _id: joi.string().optional(),
  phone: joi.string().optional().min(10),
  address: joi.string().optional().min(3),
  createdAt: joi.date().optional(),
  updatedAt: joi.date().optional(),
  __v: joi.number().optional(),
  cart: joi.array().optional(),
  role: joi.string().optional(),
  password,
});

const userValidationSchema = userUpdatesValidationSchema.append({
  phone: joi.string().required().min(10),
  address: joi.string().required().min(3),
  password,
});

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  quantity: { type: Number, required: true },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    cart: { type: [cartSchema], default: [] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = {
  UserModel,
  userValidationSchema,
  userUpdatesValidationSchema,
};

UserModel.find({}).then((users) => {
  console.log("user", users[0]);
  console.log("admin", users[1]);
});
