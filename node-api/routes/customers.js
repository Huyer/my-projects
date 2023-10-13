const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Customer = require("../models/Customer");

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
    const newItem = new Customer(data);
    newItem
      .save()
      .then((result) => {
        res.send({ message: "Tạo mới thành công" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// lấy toàn bộ danh sách customer
router.get("/", function (req, res, next) {
  try {
    Customer.find()
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

//lấy category theo id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Customer.findById(id)
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

//update customer
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Customer.findByIdAndUpdate(id, data, {
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

//delete customer a
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Customer.findByIdAndDelete(id)
      .then((result) => {
        res.send({ message: "deletedddd" });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

//delete all customer
router.delete("/", function (req, res, next) {
  try {
    Customer.deleteMany({})
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
