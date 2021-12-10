const News = require('../models/News');

class NewsController {
    getNews(req, res) {
        res.render('news')
    }

    addNews(req, res) {
        res.render('addnews',{ message: req.flash('message')})
    }

    addNewsFinally(req, res) {
      req.body.srcImg = req.files.map(function (item, index) {
        return `uploads/` + item.filename;
      });
      let data =[];
      if (typeof req.body.content ==='string'){
          data[0] =[req.body.content,req.body.srcImg[0]]
      }else {
        for (let i in req.body.content){
          data.push([req.body.content[i],req.body.srcImg[i]])
        }
      }
      const title = data[0];

      News.AddNews(req.con,[title[0], title[1]], (err,result)=>{
        if (err){
          req.flash('message', 'Lỗi server. Vui lòng thử lại!');
          return res.redirect('add-news')
        }
        if (result){
          const config = [];
          data.map((item,i)=>{
            i>0 ? config.push([item[0],item[1],result.insertId]) : null
          })
          News.AddContentNews(req.con,config,(err,resultContent) =>{
            if (err){
              req.flash('message', 'Lỗi server. Vui lòng thử lại!');
              return res.redirect('add-news')
            }
            req.flash('message', 'Thêm thành công');
            return res.redirect('add-news')
          })

        }
      })
    }


    editNews(req, res) {
        res.render('edit-news')
    }

    editNewsFinally(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            var data = req.body;
            data.srcImg = fileName;
            res.send(data);
        }
    }
}

module.exports = NewsController;
