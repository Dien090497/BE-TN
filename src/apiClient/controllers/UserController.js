const User = require('../models/User')
const {errorResponse, successResponse} = require("../../lib/response");

class UserController {
    updateInfoUser(req,res){
      User.setInfoUser(req.con,req.body,(err, ress)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Update user error',err));
        return res.status(200).json(successResponse(200,ress));
      })
    }
}

module.exports = UserController;
