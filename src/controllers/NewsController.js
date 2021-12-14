const News = require('../models/News');
const {successResponse, errorResponse} = require("../lib/response");

const admin = require("firebase-admin");
const User = require("../apiClient/models/User");

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};

class NewsController {
    getNews(req, res) {
        News.GetAllNews(req.con, [req.query.page,req.query.size,null], (err, data)=>{
            if (err) return res.status(503).json(errorResponse(503,null,err));
            News.countNews(req.con,(e, count)=>{
                return res.status(201).json(successResponse(210,{
                    count: count[0].count,
                    news: data
                }));
            })
        })
    }

    getInfoNews(req, res) {
        News.GetAllNews(req.con, [0,0,req.params.id_news], (err, data)=>{
            if (err) return res.status(503).json(errorResponse(503,null,err));
            return res.status(200).json(successResponse(200,data[0]));
        })
    }

    addNews(req, res) {
      req.body.srcImg = `uploads/` + req.file.filename;
        News.AddNews(req.con,[req.body.title,req.body.srcImg,req.body.content],(e,data)=>{
          if (e) return res.status(503).json(errorResponse(503,null,e));
            User.getFirebaseToken(req.con,null,(e,token) =>{
              if (e) return res.status(503).json(errorResponse(503, 'Token Firebase error',e));
              const tokenFirebase=[];
              token.map(obj=>{
                tokenFirebase.push(obj.firebase_token)
              })
              const payload = {
                    notification: {
                        title: 'Hot Hot Hot!!!',
                        body: req.body.title,
                    }
                };
                admin.messaging().sendToDevice(tokenFirebase, payload , options)
                  .then((response)=>{
                      console.log('Send Message success!!!', response)
                  }).catch((err)=>{
                    console.log('Send Message error!!!', err)
                });
                return res.status(200).json(successResponse(200));
            })
      })
    }

    deleteNews(req, res){
        News.DeleteNews(req.con,req.params.id_news,(e, result)=>{
            if (e) return res.status(503).json(errorResponse(503,null,e));
            return res.status(200).json(successResponse(200,result));
        })
    }

    editNews(req, res) {
        var data = req.body;
        if (req.file) data.image = `uploads/` + req.file.filename;
        News.UpdateNews(req.con,data,(err, data)=>{
            if (err) return res.status(503).json(errorResponse(503,null,err));
            return res.status(200).json(successResponse(200,data));
        })
    }
}

module.exports = NewsController;
