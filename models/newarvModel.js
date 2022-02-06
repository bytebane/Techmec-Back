const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const newarvSchema = mongoose.Schema(
  {
      newarvImg:{
          type: String
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
newarvSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("newarv", newarvSchema);
