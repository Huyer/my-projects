const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Product = require("../models/Product");

// Kết nối với cơ sở dữ liệu MongoDB (node-api)
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Route POST để tạo danh mục mới
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    // Nếu danh mục chưa tồn tại, tạo danh mục mới và lưu vào cơ sở dữ liệu
    const newItem = new Product(data);
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

// lấy toàn bộ danh sách product
router.get("/", function (req, res, next) {
  try {
    Product.find()
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

//lấy product theo id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findById(id)
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

//update product
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    Product.findByIdAndUpdate(id, data, {
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

//delete product
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
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

//delete all products
router.delete("/", function (req, res, next) {
  try {
    Product.deleteMany({})
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
