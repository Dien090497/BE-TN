const User = require('../models/User')
const {errorResponse, successResponse} = require("../../lib/response");

class UserController {
     updateInfoUser(req, res){
         User.setInfoUser(req.con, req.body, async (err, ress) => {
            if (err) return res.status(503).json(errorResponse(503, 'Update user error', err));
            if (ress.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
            return res.status(200).json(successResponse(200, req.body));
        })
         User.getInforUser(req.con,req.body,(err,response)=>{
             return res.send(response[0]);
         })
    }

    changePassword(req, res) {
        const password = md5(req.body.password);
        const old_password = md5(req.body.old_password);
        const id_user = req.body.id_user;
        User.validatePassword(req.con,[id_user,old_password],(errFind,count)=>{
            if (errFind) return res.status(403).json(errorResponse(403, 'Not found', errFind));
            if (count[0].count === 0) return res.status(403).json(errorResponse(403, 'Account error'));
            User.changePassword(req.con, [id_user, password], (err, ress) => {
                if (err) return res.status(503).json(errorResponse(503, 'Update user error', err));
                if (ress.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
                return res.status(200).json(successResponse(200, 'OK'));
            })

        })
    }
}

module.exports = UserController;
