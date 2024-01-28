const { Router } = require("express");
const { upload } = require("../middlewares/multer");
const { userValidationSchema, UserModel } = require("../models/user-model");
const { signJwt, verifyAuth } = require("../middlewares/auth");

const userRouter = Router();

userRouter.get("/refresh", verifyAuth, async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.user._id);
    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    const userData = foundUser.toObject();
    delete userData.password;
    const jwtToken = signJwt({ ...userData, email: null });

    res.send({ ...userData, jwtToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post("/login", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const foundUser = await UserModel.findOne({ email: user.email });
    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    if (foundUser.password !== user.password) {
      return res.status(400).send("Wrong password");
    }

    const userData = foundUser.toObject();
    delete userData.password;

    const jwtToken = signJwt({ ...userData, email: null });

    res.send({ ...userData, jwtToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post("/register", upload.single("avatar"), async (req, res) => {
  const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
  };

  const result = userValidationSchema.validate(user);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  console.log("req.file", req.file);
  try {
    const newUser = new UserModel({
      ...user,
      imageUrl: req.file?.path.split("server")[1],
    });

    const savedUser = await newUser.save();

    const userData = savedUser.toObject();
    delete userData.password;

    const jwtToken = signJwt({ ...userData, email: null });

    res.send({ ...userData, jwtToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post("/cart", verifyAuth, async (req, res) => {
  const cart = req.body;
  try {
    const foundUser = await UserModel.findById(req.user._id);
    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    foundUser.cart = cart;
    await foundUser.save();

    res.send("Cart saved");
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err.message);
  }
});

module.exports = { userRouter };
