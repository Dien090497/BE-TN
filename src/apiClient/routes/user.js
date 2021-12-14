const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const UserController = require("../controllers/UserController");
const controller = new UserController();

router.post("/update", (req,res)=>controller.updateInfoUser(req,res));


module.exports = router;
