const router = require("express").Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { verifyAdmin } = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `tmadminimg_${file.originalname}.${ext}`);
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

router.post("/", adminController.signUp); //create admin a/c

router.post("/login", adminController.logIn); //login to admin a/c

router.get("/profile/:userId", verifyAdmin, adminController.profile); //view a/c data

router.patch("/:userId", verifyAdmin, adminController.updateAdmin); //update a/c data

router.post("/setDP", upload.single("displayPicture"), async (req, res) => {
  if (req.file === undefined)
    return res
      .status(400)
      .send({ success: true, message: "you must select a file." });

  return res.status(200).send({ success: true, message: "Image Uploaded" });
}); //set/update DP

router.delete("/:userId", verifyAdmin, adminController.deleteAdmin); //delete admin a/c

router.get("/viewalladmins", verifyAdmin, adminController.viewAllAdmins); //view all admins

router.get("/viewallusers", verifyAdmin, userController.viewAllUsers); //view all users

router.delete("/user/:userId", verifyAdmin, userController.deleteUser); //delete user a/c

module.exports = router;
