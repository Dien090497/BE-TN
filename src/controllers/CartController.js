const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class CartController {
    getListCart(req, res) {
        res.render('order');
    }
}

module.exports = CartController;
