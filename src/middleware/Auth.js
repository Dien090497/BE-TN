const jwt = require('jsonwebtoken')
require('dotenv').config();

function verifyToken(req, res, next) {
    var token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                req.flash('message', 'Hết hạn đăng nhập!')
                res.redirect('/',)
            }
            if (decoded){
                req.auth = decoded.email;
                console.log("Verify Success!")
                next();
            }
        });
    }else {
      req.flash('message', 'Hết hạn đăng nhập!')
      res.redirect('/',)
    }
}

module.exports = {
    verifyToken: verifyToken,
};
