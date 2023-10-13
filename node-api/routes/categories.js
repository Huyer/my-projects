const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Category = require("../models/Category");

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

    // Kiểm tra xem đã tồn tại danh mục có trường "name" giống với giá trị "name" trong yêu cầu POST
    const existingCategory = await Category.findOne({ Name: data.Name });

    if (existingCategory) {
      // Nếu danh mục đã tồn tại, gửi thông báo lỗi
      return res.status(400).send({ message: "Category already exists." });
    }

    // Nếu danh mục chưa tồn tại, tạo danh mục mới và lưu vào cơ sở dữ liệu
    const newItem = new Category(data);
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

// lấy toàn bộ danh sách category
router.get("/", function (req, res, next) {
  try {
    Category.find()
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
    Category.findById(id)
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

//update category
router.patch("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    let data = req.body;
    data.UpdateDate = new Date();

    Category.findByIdAndUpdate(id, data, {
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

//delete category
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Category.findByIdAndDelete(id)
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

//delete all category
router.delete("/", function (req, res, next) {
  try {
    Category.deleteMany({})
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
