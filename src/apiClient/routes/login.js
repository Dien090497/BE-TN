const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const LoginController = require("../controllers/LoginController");
const controller = new LoginController();

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post("/save-firebase-token", (req,res)=>controller.saveFirebaseToken(req,res));


module.exports = router;
