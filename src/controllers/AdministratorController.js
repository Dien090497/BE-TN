const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const md5 = require('md5');
const {errorResponse, successResponse} = require("../lib/response");

// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class AdministratorController {
    editProfile(req, res) {
      const newPassword = md5(req.body.password);
      Admin.EditProfile(req.con,[req.body.id_admin,newPassword],(err,data)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Bill Address error',err));
        return res.status(200).json(successResponse(200));
      })
    }

    getUser(req,res){
      Admin.getUser(req.con,[req.query.page, req.query.size],(err,data)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Bill Address error',err));
        Admin.countUser(req.con,(errCount,count)=>{
          return res.status(200).json(successResponse(200,{
            count: count[0].count,
            users: data
          }));
        })
      })
    }
}

module.exports = AdministratorController;
