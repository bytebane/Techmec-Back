const router = require("express").Router();
const addrController = require("../controllers/addressController");
const { verifyUser } = require("../middleware/verifyToken");

router.post("/", verifyUser, addrController.createAddress);
router.get("/:userId", verifyUser, addrController.getAddress);
router.patch("/:addrId", verifyUser, addrController.editAddress);

module.exports = router;
