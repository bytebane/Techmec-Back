const router = require("express").Router();
const notiController = require("../controllers/notificationController");

router.post("/", notiController.createNotifications);

router.get("/:userId", notiController.getNotifications);

router.delete("/user/:userId", notiController.deleteUserNotifications);
router.delete("/:notiId", notiController.deleteNotification);

// router.get("/show/:userId", cartController.getAllOrders);
// router.get("/cart", verifyUser, cartController.cart);

module.exports = router;
