const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const ProductController = require("../controllers/ProductController");
const controller = new ProductController();

router.get("/list-product", controller.getListProduct);

router.get("/detail-product", controller.getDetailProduct);


module.exports = router;
