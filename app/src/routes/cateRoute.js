const express = require("express");
const router = express.Router();
const multer = require("multer");
const cateController = require('../controllers/cateController')
const { verifyAdmin } = require("../middleware/verifyToken"); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      // cb(null, `${req.body.name}_dt$${Date.now()}.${ext}`);
      cb(null, `tmcat_${req.body.name}.${ext}`);
    },
  });
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 100, //10KB
    },
    fileFilter: fileFilter,
  });

router.post('/', verifyAdmin, upload.single("catImage"), cateController.createCategory);

router.get('/', cateController.getCategories);

router.patch('/:cateId', verifyAdmin, cateController.editCategories);

router.delete('/:cateId', verifyAdmin, cateController.deleteCategories);

module.exports = router;