const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const CartController = require("../controllers/CartController");
const controller = new CartController();

router.get("/", controller.getListCart);

module.exports = router;
