const jwt = require('jsonwebtoken')
require('dotenv').config();
const {
    successResponse,
    errorResponse
} = require('../lib/response');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json(errorResponse(401,'Token is exit'))
    var token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, 'dunghoivisao123', function(err, decoded) {
            if (err) {

                return res.status(401).json(errorResponse(401,'Token is expire'))
            }
            if (decoded){
                req.auth = decoded.email;
                next();
            }
        });
    }else {
        return res.status(401).json(errorResponse(401,'Token is expire'))
    }
}


module.exports = {
    verifyToken: verifyToken,
};
