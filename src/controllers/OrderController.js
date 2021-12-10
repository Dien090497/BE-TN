const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class OrderController {
    getListOrder(req, res) {
        res.render('order');
    }

getListOrderApi(){

}
    getDetailOrder(req, res) {
        res.render('detail_order');
    }
}

module.exports = OrderController;
