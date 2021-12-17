const User = require('../models/User')
const {errorResponse, successResponse} = require("../../lib/response");

class UserController {
     updateInfoUser(req, res){
         User.setInfoUser(req.con, req.body, async (err, ress) => {
            if (err) return res.status(503).json(errorResponse(503, 'Update user error', err));
            if (ress.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
        });
        User.getInforUser(req.con,req.body,(err,response)=>{
            return res.send(response[0]);
        })
    }
}

module.exports = UserController;
