const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const LoginController = require("../controllers/LoginController");
const controller = new LoginController();

router.post("/login", (req,res)=>controller.loginFinal(req,res));

router.post("/login/token-firebase", (req,res)=>controller.setTokenFirebase(req,res));

module.exports = router;
