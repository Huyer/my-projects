const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  FirstName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  LastName: {
    type: String,
    maxLength: 50,
    required: true,
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
    required: true,
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
  Birthday: {
    type: Date,
  },
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  Password: {
    type: String,
    required: true,
  },
  LastActivity: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Locked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

schema.virtual("fullName").get(function () {
  return this.FirstName + " " + this.LastName;
});

// Đặt tùy chọn để hiển thị trường ảo khi lấy đối tượng
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Customer", schema);
