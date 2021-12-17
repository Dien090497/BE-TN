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


  updateAdmin(req, res) {
    Admin.getIsAdmin(req.con,[req.body.id_admin],(err,suc)=>{
      if (err) return res.status(503).json(errorResponse(503, 'Update admin err',err));
      if (suc[0].is_admin === 0) return res.status(200).json(successResponse(200,{message: 'Bạn không có quyền cập nhật'}));
      Admin.setUserIsAdmin(req.con,[req.body.action,req.body.id_user],(err,suc)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Update user admin err',err));
        Admin.setArmin(req.con,[req.body.action,req.body.name,req.body.id_user,req.body.password],(error,stt)=>{
          if (error) return res.status(503).json(errorResponse(503, 'Update admin err',error));
          return res.status(200).json(successResponse(200,{message: 'OK'}));
        })
      })
    })
  }
}

module.exports = AdministratorController;
