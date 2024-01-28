const mongoose = require("mongoose");
const joi = require("joi");

const userValidationSchema = joi.object({
  fullName: joi.string().required().min(3),
  email: joi.string().email().required().min(5),
  phone: joi.string().required().min(10),
  address: joi.string().required().min(3),
  password: joi.string().required().min(8),
  imageUrl: joi.string().optional(),
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

module.exports = { UserModel, userValidationSchema };

UserModel.find({}).then((users) => {
  console.log("user", users[0]);
  console.log("admin", users[1]);

  // users[1].role = "admin";
  // users[1].save();
});
