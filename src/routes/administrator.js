const express = require("express");
const router = express.Router();
const multer = require("multer");
const Auth = require('../middleware/Auth');

/**
 * Routing for Auth
 */
const AdministratorController = require("../controllers/AdministratorController");
const controller = new AdministratorController();

router.post("/",Auth.verifyToken ,(req,res)=>controller.editProfile(req,res));

router.get("/user",Auth.verifyToken , (req,res)=>controller.getUser(req,res));

module.exports = router;
