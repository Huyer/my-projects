const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Order = require("../models/Order");

// Kết nối với cơ sở dữ liệu MongoDB (node-api)
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Route POST để tạo new order
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //tạo danh mục mới và lưu vào cơ sở dữ liệu
    const newItem = new Order(data);
    newItem
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// GET all
router.get("/", function (req, res, next) {
  try {
    Order.find()
      .populate({ path: "OrderDetails.Product", populate: { path: "Category" } })
      .populate("Customer")
      .populate("Employee")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//get order by id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Order.findById(id)
      .populate({ path: "OrderDetails.Product", populate: { path: "Category" } })
      .populate("Customer")
      .populate("Employee")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//update order
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    Order.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

//delete order
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Order.findByIdAndDelete(id)
      .then((result) => {
        res.send({ message: "deleted" });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//delete all orders
router.delete("/", function (req, res, next) {
  try {
    Order.deleteMany({})
      .then((result) => {
        res.send({ message: "All categories deleted" });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});
module.exports = router;
