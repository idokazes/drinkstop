require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { productRouter } = require("./routers/product-router");
const mongoose = require("mongoose");
const { userRouter } = require("./routers/user-router");
const { orderRouter } = require("./routers/orders-router");
const { rateLimiter } = require("./middlewares/rate-limit");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimiter);

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
