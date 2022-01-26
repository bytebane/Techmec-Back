const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const productSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    mrPrice: {
      type: Number,
      default: 1,
    },
    sPrice: {
      type: Number,
      default: 2,
    },
    colors:[{
      type: String,
      default: "black"
    }],
    productImage: {
      type: String,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
