require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { productRouter } = require("./routers/product-router");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);

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
