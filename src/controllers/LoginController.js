const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const md5 = require('md5');

/**
 * Class Auth Controller
 */
class LoginController {
    login(req, res) {
        res.render('login', { layout: false, message: req.flash('message') });
    }

    loginFinal(req, res) {
        var password = md5(req.body.password);
        Admin.getAdmin(req.con, [req.body.email, password],
            (err, result) => {
                if (err) {
                  req.flash('message', 'Lỗi server! Vui lòng thử lại sau')
                  return res.redirect('/');
                }
                if (result[0] === undefined || result[0] == null) {
                    req.flash('message', 'Sai tài khoản hoặc mật khẩu!')
                    return res.redirect('/');
                } else {
                    const token = jwt.sign({ email: result[0].email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2d' });
                    res.cookie('token', token)
                    res.cookie('menu', 'product')
                    return res.redirect('/product');
                }

            })

    }

}

module.exports = LoginController;
