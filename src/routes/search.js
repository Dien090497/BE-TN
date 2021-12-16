const express = require("express");
const router = express.Router();

/**
 * Routing for Auth
 */
const SearchController = require("../controllers/SearchController");
const controller = new SearchController();

router.get("/filter", (req, res) =>controller.searchNameFilter(req,res));

router.get("/range-price", (req, res) =>controller.getMaxMinPrice(req,res));

router.get("/:name", (req, res) =>controller.searchName(req,res));

module.exports = router;
