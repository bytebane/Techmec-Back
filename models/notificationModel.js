const mongoose = require("mongoose");
const NotificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notiMessage: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", NotificationSchema);
