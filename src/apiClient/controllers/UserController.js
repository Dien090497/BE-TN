const User = require('../models/User')
const {errorResponse, successResponse} = require("../../lib/response");

class UserController {
    updateInfoUser(req, res) {
        User.setInfoUser(req.con, req.body, (err, ress) => {
            if (err) return res.status(503).json(errorResponse(503, 'Update user error', err));
            if (ress.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
            return res.status(200).json(successResponse(200, 'OK'));
        })
    }
}

module.exports = UserController;
