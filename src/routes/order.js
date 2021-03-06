const express = require("express");
const router = express.Router();
const Auth = require('../middleware/Auth');

/**
 * Routing for Auth
 */
const OrderController = require("../controllers/OrderController");
const controller = new OrderController();

router.get("/", (req, res) =>controller.listOrder(res,req));

router.post("/", (req,res)=>controller.setOrder(res,req));

router.post("/qnt", (req,res)=>controller.setQntProduct(res,req));

router.get("/detail-order/:id_bill", (req, res) =>controller.detailOrder(res,req));

router.put("/update-order", (req, res) =>controller.editStatusOrder(res,req));

router.put("/update-order/address/:id_bill", (req, res) =>controller.editAddress(res,req));

router.get("/:id_user", (req, res) =>controller.listOrderUser(res,req));


module.exports = router;
