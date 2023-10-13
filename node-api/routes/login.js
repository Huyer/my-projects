const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../constant/dbSettings");

// Import mô hình danh mục
const Employee = require("../models/Employee");

// Kết nối với cơ sở dữ liệu MongoDB (node-api)
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const employee = await Employee.findOne({ Email, Password }); // Tìm Employee có Email và Password trùng với giá trị trong req.body

    if (employee) {
      // Email và Password hợp lệ, tìm thấy Employee
      res.status(200).send({ message: "Đăng nhập thành công." });
      //xử lí code ở đây
    } else {
      // Email hoặc Password không hợp lệ, không tìm thấy Employee
      res.status(401).send({ message: "Email hoặc Password không hợp lệ." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
