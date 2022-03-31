const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

router.post("/", verifyUser, orderController.createOrders);

router.get("/:userId", verifyUser, orderController.getOrder);
router.get("/", orderController.getOrders);
router.patch("/:orderId", orderController.updateOrders);
router.delete("/:orderId", verifyUser, orderController.deleteOrders);

// router.get("/show/:userId", cartController.getAllOrders);
// router.get("/cart", verifyUser, cartController.cart);

module.exports = router;
