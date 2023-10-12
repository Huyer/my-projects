const mongoose = require("mongoose");

const OrderDetailSchema = new mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  Quantity: { type: Number, required: true, min: 0 },
});

// Virtual with Populate
OrderDetailSchema.virtual("Product", {
  ref: "Product",
  localField: "ProductId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in JSON
OrderDetailSchema.set("toJSON", { virtuals: true });

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
  OrderDetails: [OrderDetailSchema],
});

// Virtual with Populate
orderSchema.virtual("Customer", {
  ref: "Customer",
  localField: "CustomerId",
  foreignField: "_id",
  justOne: true,
});

orderSchema.virtual("Employee", {
  ref: "Employee",
  localField: "EmployeeId",
  foreignField: "_id",
  justOne: true,
});

// Virtuals in JSON
orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
