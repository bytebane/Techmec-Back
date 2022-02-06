const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const excdealSchema = mongoose.Schema(
  {
    dealno:{
        type: Number,
        min: 1,
        max: 10,
        default: 1
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
excdealSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("excdeal", excdealSchema);
