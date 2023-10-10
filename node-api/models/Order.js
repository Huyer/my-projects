const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  CreatedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  ShippedDate: {
    type: Date,
    validate: {
      validator: function (value) {
        // Kiểm tra ShippedDate >= CreatedDate
        return !this.CreatedDate || !value || value >= this.CreatedDate;
      },
      message: "ShippedDate must be greater than or equal to CreatedDate",
    },
  },
  Status: {
    type: String,
    maxLength: 50,
    default: "WAITING",
    enum: ["WAITING", "COMPLETED", "CANCELED"],
  },
  Description: {
    type: String,
  },
  ShippingAddress: {
    type: String,
    maxLength: 500,
  },
  PaymentType: {
    type: String,
    maxLength: 20,
    default: "CASH",
    enum: ["CREDIT CARD", "CASH"],
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  EmployeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  ContactInformation: {
    type: Object,
  },
  ShippingInformation: {
    type: Object,
  },
  PaymentInformation: {
    type: Object,
  },
});

module.exports = mongoose.model("Order", orderSchema);
