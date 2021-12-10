const jwt = require('jsonwebtoken')
const Product = require('../models/Product')

class ProductController {
  getListProduct(req, res) {
    const api = {
      error_code: 0,
      message: '',
      data: {},
      err: {},
    };
    Product.ListProduct(req.con, (err, resultProduct) => {
      if (err) {
        api.error_code = 400
        api.message = 'failed'
        api.err = err;
        return res.json({api})
      }
      if (resultProduct) {
        api.data.product = resultProduct;
        Product.ListImage(req.con, (err, resultImage) => {
          if (err) {
            api.error_code = 400
            api.message = 'failed'
            api.err = err;
            return res.json({api})
          }
          if (resultImage) {
            for (var i = 0; i < resultProduct.length; i++) {
              resultProduct[i].src=[]
              for (var j = 0; j < resultImage.length; j++) {
                if (resultProduct[i].id_product == resultImage[j].id_product) {
                  resultProduct[i].src.push(resultImage[j].src);
                }
              }
            }
            api.data.image = resultImage;
            api.error_code = 200
            api.message = 'success'
            api.data = resultProduct
            return res.json({api})
          }
        })
      }
    })
  }

  getDetailProduct(req,res){
    if (!req.body.id_product){
      return res.json({api:{
          error_code: 400,
          message: 'failed',
          err: {
            error_message: "NOT_FOUND"
          },
        }})
    }
    Product.DetailProduct(req.con,req.body.id_product,(err,result)=>{
      if (err) return res.json({api:{
          error_code: 400,
          message: 'failed',
          err: err,
        }})
      if (result[0]){
        result[0].src =[];
        Product.ListImageProduct(req.con,req.body.id_product,(err,resultImage)=>{
          if (err) return res.json({api:{
              error_code: 400,
              message: 'failed',
              err: err,
            }})
          if (resultImage){
            for (let i in resultImage){
              result[0].src.push(resultImage[i].src)
            }
            res.json(result[0])
          }
        })
      }
    })
  }
}

module.exports = ProductController;
