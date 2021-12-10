const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const LoginController = require("../controllers/LoginController");
const controller = new LoginController();

router.get("/", controller.login);

router.post("/login", controller.loginFinal);

router.get("/api/login", controller.login);
module.exports = router;
