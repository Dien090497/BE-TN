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
          return  res.status(400).json(errorResponse({message:'err'}))
        }
        if (result) {
          if (result[0]) {
              return  res.status(201).json(successResponse(201,result[0]))
          } else {
            return  res.status(400).json(errorResponse({message:'err'}))
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
    const token = jwt.sign({name},'dunghoivisao123', {expiresIn: '2d'})

    const data = {
      id_user: req.body.id_user,
      phone_number: req.body.phone_number,
      name: req.body.name,
      password: password,
      avatar: req.body.avatar,
      token:token
    }

    console.log(data)
    User.Register(req.con, data, (err, result) => {
    if(err){
     return  res.status(400).json(errorResponse(400,'Registration failed '))
    }else
      return  res.status(201).json(successResponse(201))
    })
  }

  saveFirebaseToken(req, res){
    const data = {
      token: req.body.firebase_token,
      id_user: req.body.id_user
    }
    User.saveFirebaseToken(req.con,data,(err,stt)=>{
      if(err) return  res.status(400).json(errorResponse(400,'Save Firebase Token Fail '))
      if (stt.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
      return  res.status(200).json(successResponse(200,{message:'OK'}))
    })
  }

}

module.exports = LoginController;
