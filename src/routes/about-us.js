const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const AboutUsController = require("../controllers/AboutUsController");
const controller = new AboutUsController();

router.get("/", controller.getInfoShop);

module.exports = router;