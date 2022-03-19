const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.createNotifications = async (req, res) => {
  const newNoti = {
    user: req.body.user,
    notiMessage: req.body.notiMessage,
  };
  try {
    const Noti = await Notification.create(newNoti);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable to create Notification", error: " " + error });
  }
};
exports.getNotifications = async (req, res) => {
  try {
    const notiData = await Notification.find({
      user: req.params.userId,
    }).populate("user", "_id firstName lastName email phone");
    if (!notiData) {
      return res
        .status(400)
        .send({ success: false, message: "All Caught Up!" });
    }
    return res.status(200).send({ notifications: notiData });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable to Fetch Notifications", error: " " + error });
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    const deletedNoti = await Notification.findByIdAndDelete(req.params.notiId);
    if (!deletedNoti) {
      return res
        .status(400)
        .send({ success: false, message: "Could not clear Notification" });
    }
    return res.status(200).send({ message: "Notification Cleared!" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable toFetch Notifications", error: " " + error });
  }
};
exports.deleteUserNotifications = async (req, res) => {
  try {
    const deletedNoti = await Notification.deleteMany({
      user: req.params.userId,
    });

    if (!deletedNoti) {
      return res
        .status(400)
        .send({ success: false, message: "Could not clear Notifications" });
    }
    return res.status(200).send({ message: "Notifications Cleared!" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "unable to Fetch Notifications", error: " " + error });
  }
};
