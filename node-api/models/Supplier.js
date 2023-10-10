const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Name: {
    type: String,
    maxLength: 100,
  },
  Email: {
    type: String,
    maxLength: 50,
    validate: {
      validator: function (value) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Email không hợp lệ",
    },
  },
  PhoneNumber: {
    type: String,
    maxLength: 50,
    validate: {
      validator: function (value) {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
        const phoneRegex = /^\d{10}$/; // Ví dụ: Kiểm tra xem số điện thoại có 10 chữ số không
        return phoneRegex.test(value);
      },
      message: "Số điện thoại không hợp lệ",
    },
  },
  Address: {
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model("Supplier", schema);
