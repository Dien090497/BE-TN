const express = require("express");
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: './src/public/uploads/',
    filename: function(req, file, cb) {
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
 * Routing for News
 */
const HelpController = require("../controllers/HelpController");
const controller = new HelpController();

router.get("/", (req, res) => controller.getHelp(req, res));

router.get("/add-help", (req, res) => controller.addHelp(req, res));

router.post("/add-help", upload.array('pictureNews'), (req, res) => controller.addHelpFinally(req, res));

router.get("/edit-help", (req, res) => controller.editHelp(req, res));

router.post("/edit-help", upload.array('pictureNews'), (req, res) => controller.editHelpFinally(req, res));



module.exports = router;