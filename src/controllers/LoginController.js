const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const md5 = require('md5');
const { successResponse, errorResponse } = require('../lib/response');

/**
 * Class Auth Controller
 */
class LoginController {

    loginFinal(req, res) {
      res.json({data:123123213});

        var password = md5(req.body.password);
        Admin.getAdmin(req.con, [req.body.email, password],
            (err, result) => {
                if (err) {
                  return res.status(503).json(errorResponse(503, 'Server error'));
                }
                if (result[0] === undefined || result[0] == null) {
                    return res.status(401).json(errorResponse(401,'Not found'));
                } else {
                    const token = jwt.sign({ email: result[0].email }, 'dunghoivisao123', { expiresIn: '2d' });
                    return res.status(200).json(successResponse(200,{
                        token: token,
                        id_admin: result[0].id_admin
                    }));
                }

            })

    }

    setTokenFirebase(req,res){
      if (!req.body.id_admin && !req.body.token) return res.status(400).json(errorResponse(400));
      Admin.SetToken(req.con,[req.body.id_admin,req.body.token],(err, data)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Delete Img Error', err));
        return res.status(204).json(successResponse(204, data));
      })
    }

}

module.exports = LoginController;
