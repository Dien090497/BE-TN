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
 * Routing for User
 */

const UserController = require("../controllers/UserController");
const controller = new UserController();

router.post("/update", upload.single("avatar"),(req,res)=>controller.updateInfoUser(req,res));


module.exports = router;
