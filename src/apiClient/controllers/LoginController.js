const jwt = require('jsonwebtoken')
const User = require('../models/User')
const md5 = require('md5');
/**
 * Class User Controller
 */
const {successResponse,errorResponse}=require('../../lib/response')
class LoginController {

  login(req, res) {
    var password = md5(req.body.password);
    const data = {
      id_user: req.body.id_user,
      password: password,
      login_type: req.body.login_type,
      name: req.body.name,
      avatar: req.body.avatar,
    }

    // const token = jwt.sign({data}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2d'})

    if (!data.id_user || !data.login_type) {
      const api = {
        error_code: 400,
        message: 'failed',
        data: {},
        err: {},
      }

      return res.json({api})
    }
    if (data.login_type === "FACEBOOK" || data.login_type === "GOOGLE") {
      User.Login(req.con, [data.id_user], (err, result) => {
        if (err) {
          const api = {
            error_code: 400,
            message: 'failed',
            data: {},
            err: err,
          }
          return res.json({api})
        }
        if (result[0]) {
          const api = {
            error_code: 200,
            message: 'success',
            data: result[0],
            err: {},
            token: token
          }
          return  res.status(201).json(successResponse(201,[result[0],token]))
        } else {
          User.RegisterOrther(req.con, [data.id_user, data.name, data.avatar], (err, result) => {
            if (err) {
              const api = {
                error_code: 400,
                message: 'failed',
                data: {},
                err: err,
                token: ''
              }
              return res.json({api})
            }
            if (result) {
              const api = {
                error_code: 200,
                message: 'success',
                data: result,
                err: {},
                token: token
              }
              return res.json({api})
            }
          })
        }
      })
    }
    else if (data.login_type === "PHONENUMBER") {
      User.LoginPhoneNumber(req.con, [data.id_user, data.password], (err, result) => {
        if (err) {
          const api = {
            error_code: 400,
            message: 'failed',
            data: {},
            err: err,
            token: ''
          }
          return res.json({api})
        }
        if (result) {
          if (result[0]) {
            // User.addToken(req.con,[result[0].id_user,token],(err,result1)=>{
            //  if(err){
            //   return  console.log('err',err)
            //  }
            //   console.log(result1.token)
              return  res.status(201).json(successResponse(201,[result[0]]))
            // })

          } else {
            const api = {
              error_code: 400,
              message: 'failed',
              data: {},
              err: {
                error_message: "ACCOUNT_DOES_NOT_EXIST"
              },
              token: '',
            }
            return res.json({api})
          }
        }
      })
    }
    else {
      const api = {
        error_code: 400,
        message: 'failed',
        data: {},
        err: {
          error_message: "ACCOUNT_DOES_NOT_EXIST"
        },
        token: '',
      }
      return res.json({api})
    }

  }

  register(req, res) {
    var password = md5(req.body.password);
    var name=req.body.name;
    const token = jwt.sign({name},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2d'})

    const data = {
      id_user: req.body.id_user,
      name: req.body.name,
      password: password,
      token:token
    }

    User.Register(req.con, data, (err, result) => {
    if(err){
     return  res.status(400).json(errorResponse(400,'Registration failed '))
    }else
      return  res.status(201).json(successResponse(201))
    })
  }

}

module.exports = LoginController;
