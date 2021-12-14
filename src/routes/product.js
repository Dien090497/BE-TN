const express = require("express");
const router = express.Router();
const multer = require('multer');
const Auth = require('../middleware/Auth');

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
 * Routing for Auth
 */
const ProductController = require("../controllers/ProductController");
const controller = new ProductController();

router.get("/",(req, res) => controller.listProduct(req, res));

router.get("/info",(req, res) => controller.info(req, res));

router.get("/size/:listID",(req, res) => controller.size(req, res));

router.put("/add-product",Auth.verifyToken ,upload.array('pictureProduct', 30), (req, res) => controller.addProductFinal(req, res));

router.put("/edit-product/:id_product",Auth.verifyToken , upload.array('pictureProduct', 30), (req, res) => controller.editProductFinal(req, res));

router.delete("/delete-product/:id_product" ,Auth.verifyToken , (req, res) => controller.deleteProduct(req, res));

router.get("/brand/:id_brand",(req, res) => controller.listBrand(req, res));

router.get("/category/:id_category",(req, res) => controller.listCategory(req, res));

router.get("/category",(req, res) => controller.category(req, res));

router.get("/style/:id_style",(req, res) => controller.listStyle(req, res));

module.exports = router;
