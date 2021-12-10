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
const NewsController = require("../controllers/NewsController");
const controller = new NewsController();

router.get("/", (req, res) => controller.getNews(req, res));

router.get("/add-news", (req, res) => controller.addNews(req, res));

router.post("/add-news", upload.array('imageNews'), (req, res) => controller.addNewsFinally(req, res));

router.get("/edit-news", (req, res) => controller.editNews(req, res));

router.post("/edit-news", upload.array('imageNews'), (req, res) => controller.editNewsFinally(req, res));



module.exports = router;
