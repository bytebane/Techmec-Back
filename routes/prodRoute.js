const express = require("express");
const { date } = require("joi");
const router = express.Router();
const multer = require("multer");
const ProdController = require("../controllers/prodController");
const { verifyAdmin } = require("../middleware/verifyToken");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name}.${ext}`);
    // cb(null, `${req.body.name}_dt$${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/",verifyAdmin, upload.single("productImage"), ProdController.createProduct);

router.get("/show", ProdController.getProducts);

router.delete("/:prodId", verifyAdmin, ProdController.deleteProducts);

module.exports = router;
