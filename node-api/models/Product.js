const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  Price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Price must be greater than or equal to 0",
    },
  },
  Discount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 75;
      },
      message: "Discount must be between 0 and 75",
    },
  },
  Stock: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    required: true,
  },
  CategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  SupplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  Description: {
    type: String,
  },
  PromotionPosition: {
    type: [String],
  },
  CoverImageUrl: {
    type: String,
  },
  Images: {
    type: [Object],
  },
});
productSchema.virtual("TotalPrice").get(function () {
  const price = parseFloat(this.Price.toString()); // Chuyển đổi giá thành số thực
  const discount = parseFloat(this.Discount.toString()); // Chuyển đổi giảm giá thành số thực
  return price - (price * discount) / 100; // Tính giá sản phẩm sau giảm giá
});

productSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Product", productSchema);
