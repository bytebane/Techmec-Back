const router = require("express").Router();
const multer = require("multer");
const userController = require("../controllers/userController");
const { verifyUser } = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `tmuserimg_${file.originalname}.${ext}`);
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

router.post("/", userController.signUp); //create user a/c

router.post("/login", userController.logIn); //login to user a/c

router.get("profile/:userId", verifyUser, userController.profile); //view a/c data

router.patch("/:userId", verifyUser, userController.updateUser); //update a/c data

router.post("/setDP", upload.single("displayPicture"), async (req, res) => {
  if (req.file === undefined)
    return res
      .status(400)
      .send({ success: true, message: "you must select a file." });

  return res.status(200).send({ success: true, message: "Image Uploaded" });
}); //set/update DP

router.delete("/:userId", verifyUser, userController.deleteUser); //delete user a/c

router.get("/viewallusers", verifyUser, userController.viewAllUsers); //view all users

module.exports = router;
