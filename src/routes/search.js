const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const SearchController = require("../controllers/SearchController");
const controller = new SearchController();

router.get("/filter", (req, res) =>controller.searchNameFilter(req,res));

router.get("/range-price", (req, res) =>controller.getMaxMinPrice(req,res));

router.get("/filter/range-price/:name", (req, res) =>controller.searchNameRange(req,res));

router.get("/filter/size/:name", (req, res) =>controller.searchNameSize(req,res));

module.exports = router;
