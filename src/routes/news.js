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

router.get("/:id_news", (req, res) => controller.getInfoNews(req, res));

router.put("/add-news", upload.single('imageNews'), (req, res) => controller.addNews(req, res));

router.post("/delete/:id_news", (req, res) => controller.deleteNews(req, res));

router.put("/edit-news", upload.single('imageNews'), (req, res) => controller.editNews(req, res));



module.exports = router;
