const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class OrderController {
    getInfoShop(req, res) {
        res.render('about-us');
    }

}

module.exports = OrderController;