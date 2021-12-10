const express = require("express");
const router = express.Router();
const multer = require("multer");
const Auth = require('../middleware/Auth');

const storage = multer.diskStorage({
  destination: './src/public/uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".png");
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      return cb("File phải là ảnh", false);
    } else {
      cb(null, true);
    }
  }
})
/**
 * Routing for Auth
 */
const AdministratorController = require("../controllers/AdministratorController");
const controller = new AdministratorController();

router.get("/", controller.getInfo);

router.post("/",Auth.verifyToken,upload.single('avatarAdmin') ,controller.editProfile);

module.exports = router;
