const { Router } = require("express");
const { upload } = require("../middlewares/multer");
const {
  userValidationSchema,
  UserModel,
  userUpdatesValidationSchema,
} = require("../models/user-model");
const fs = require("fs");
const { signJwt, verifyAuth, verifyAdmin } = require("../middlewares/auth");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await UserModel.find({}).select("-password");
  res.send(users);
});

userRouter.put(
  "/:userId",
  verifyAuth,
  verifyAdmin,
  upload.single("avatar"),
  async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    if (req.file) {
      updates.imageUrl = req.file?.path.split("server")[1];
    }

    const result = userUpdatesValidationSchema.validate(updates);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    try {
      const foundUser = await UserModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      if (!foundUser) {
        return res.status(404).send("User not found");
      }

      res.send(foundUser);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

userRouter.delete("/:userId", verifyAuth, verifyAdmin, async (req, res) => {
  const userId = req.params.userId;

  try {
    await UserModel.findByIdAndDelete(userId);

    res.send("User deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

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
  try {
    const newUser = new UserModel({
      ...user,
    });

    const savedUser = await newUser.save();
    if (req.file) {
      const fileNameWithoutExtension = req.file.filename.split(".")[0];
      const imageIdName = req.file.filename.replace(
        fileNameWithoutExtension,
        savedUser._id
      );
      const originalPath = req.file.path;
      const newPath = req.file.path.replace(req.file.filename, imageIdName);
      fs.renameSync(originalPath, newPath);

      savedUser.imageUrl = newPath.split("server")[1];
      await savedUser.save();
    }

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
