const express = require("express");
const router = express.Router();
const multer = require("multer");
const newarvController = require('../controllers/newarvController')
const { verifyAdmin } = require("../middleware/verifyToken"); 



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      // cb(null, `${req.body.name}_dt$${Date.now()}.${ext}`);
      cb(null, `tmnarv_${file.originalname}.${ext}`);
    },
  });
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 20, //20MB
    },
    fileFilter: fileFilter,
  });


router.post('/', verifyAdmin, upload.single('newarvImg'), newarvController.createNewarv);

router.get('/', newarvController.getNewarv);

router.patch('/:arvId', verifyAdmin,upload.single('newarvImg'), newarvController.editNewarv);

router.delete('/:arvId', verifyAdmin, newarvController.deleteNewarv);

module.exports = router;