const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const md5 = require('md5');

// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class AdministratorController {
    getInfo(req, res) {
        res.render('administrator',{ message: req.flash('message') });
    }

    editProfile(req, res) {
      if (req.file){
        req.body.avatar = `uploads/` + req.file.filename;
      }
      req.body.email = req.auth;
      const oldPassword = md5(req.body.oldPassword);
      const newPassword = md5(req.body.newPassword);
      Admin.getAdmin(req.con, [req.body.email, oldPassword],
        (err, result) => {
          if (err) {
            req.flash('message', 'Lỗi server! Vui lòng thử lại sau')
            return res.redirect('administrator');
          }
          if (result[0] === undefined || result[0] == null) {
            req.flash('message', 'Sai mật khẩu!')
            return res.redirect('administrator');
          } else {
            Admin.EditProfile(req.con,[req.body.email,newPassword],(err,resultEdit)=>{
              if (err) {
                req.flash('message', 'Lỗi server! Vui lòng thử lại sau')
                return res.redirect('administrator');
              }
              res.clearCookie("token");
              req.flash('message', 'Đổi mật khẩu thành công!')
              return res.redirect('/');
            })
          }

        })
    }
}

module.exports = AdministratorController;
