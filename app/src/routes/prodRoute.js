const express = require("express");
const { date } = require("joi");
const router = express.Router();
const multer = require("multer");
const ProdController = require("../controllers/prodController");
const { verifyAdmin } = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `tmprod_${req.body.name.replace(/ +/g, "")}_${file.originalname}.${ext}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, //10MB
  },
  fileFilter: fileFilter,
});

router.post(
  "/",
  verifyAdmin,
  upload.array("productImage", 4),
  ProdController.createProduct
);
// router.post("/",verifyAdmin, upload.array("productImage", 4), ProdController.createProduct);

router.get("/show", ProdController.getProducts);

router.patch("/:prodId", ProdController.updateProducts);
router.post("/setImg", upload.single("productImage"), async (req, res) => {
  if (req.file === undefined)
    return res
      .status(400)
      .send({ success: true, message: "you must select a file." });

  return res.status(200).send({ success: true, message: "Image Updated" });
});

router.delete("/:prodId", verifyAdmin, ProdController.deleteProducts);

module.exports = router;
