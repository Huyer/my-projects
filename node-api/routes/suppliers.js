const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Supplier = require("../models/Supplier");

// Kết nối với cơ sở dữ liệu MongoDB (node-api)
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//create new supplier
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Kiểm tra xem đã tồn tại danh mục có trường "name" giống với giá trị "name" trong yêu cầu POST
    const existingSupplier = await Supplier.findOne({ Name: data.Name });

    if (existingSupplier) {
      // Nếu danh mục đã tồn tại, gửi thông báo lỗi
      return res.status(400).send({ message: "Category already exists." });
    }

    // Nếu danh mục chưa tồn tại, tạo danh mục mới và lưu vào cơ sở dữ liệu
    const newItem = new Supplier(data);
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

//get all supplier
router.get("/", function (req, res, next) {
  try {
    Supplier.find()
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

//get supplier by id
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Supplier.findById(id)
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

//update supplier
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    let data = req.body;

    Supplier.findByIdAndUpdate(id, data, {
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

//delete supplier
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Supplier.findByIdAndDelete(id)
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

//delete all supplier
router.delete("/", function (req, res, next) {
  try {
    Supplier.deleteMany({})
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
