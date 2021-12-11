const Product = require('../models/Product');
const {successResponse}=require('./../lib/response')
const {errorResponse} = require("../lib/response");
/**
 * Class PRODUCT Controller
 */
class ProductController {

  listProduct(req, res) {
    Product.ListProduct(req.con,[req.query.page,req.query.size] ,(err, resultProduct) => {
      if (err) return res.status(503).json(errorResponse(503, 'Server error',err));
      if (resultProduct) {
        Product.ListImage(req.con, (err, resultImage) => {
          if (err) return res.status(503).json(errorResponse(503, 'Server error'));
          if (resultImage) {
            for (var i = 0; i < resultProduct.length; i++) {
              resultProduct[i].src = []
              for (var j = 0; j < resultImage.length; j++) {
                if (resultProduct[i].id_product == resultImage[j].id_product) {
                  resultProduct[i].src.push(resultImage[j].src);
                }
              }
            }
            Product.countProduct(req.con,(err, count)=>{
              if (err) return res.status(503).json(errorResponse(503, 'Server error'));
              return res.status(200).json(successResponse(200,{
                count: count[0].count,
                products: resultProduct
              }));

            })

          }
        })
      }
    })
  }

  addProductFinal(req, res) {
    var fileName = req.files.map(function (item, index) {
      return `uploads/` + item.filename;
    })
    if (!fileName){
      return res.status(400).json(errorResponse(400, 'Image is invalid'));
    }
    req.body.src = fileName;
    Product.AddProduct(req.con, req.body, (err, result) => {
      if (err){
        return res.status(503).json(errorResponse(503, 'Product error',err));
      }
      if (result) {
        var values = []

        const arrSize = req.body.size.split(',')
        const arrQnt = req.body.qnt.split(',')
        for (let i in arrSize) {
          values.push([result.insertId, arrSize[i], Number.parseInt(arrQnt[i])]);
        }
        Product.AddSizeProduct(req.con, values, (errSize, resultSize) => {
          if (errSize){
            return res.status(503).json(errorResponse(503, 'Size error',errSize));
          }
          if (resultSize) {
            const src = [];
            for (let i in fileName) {
              src.push([result.insertId, fileName[i], 'product']);
            }
            Product.AddImageProduct(req.con, src, (errSrc, resultSrc) => {
              if (errSrc) {
                return res.status(503).json(errorResponse(503, 'Image error',errSrc));
              }
              return res.status(201).json(successResponse(201, req.body));
            })
          }
        })
      }
    })
  }

  editProductFinal(req, res) {
    var fileName = req.files.map(function (item, index) {
      return `uploads/` + item.filename;
    })
    var data = req.body;
    data.id_product = req.params.id_product;
    data.listImgRemove = data.listImgRemove.split(",");
    data.srcImg = fileName;
    data.size = []
    if (typeof req.body.keyInfoProduct ==='object'){
      for (let i in req.body.keyInfoProduct) {
        data.size.push([Number.parseInt(data.id_product), req.body.keyInfoProduct[i], Number.parseInt(req.body.valueInfoProduct[i])]);
      }
    }else {
      data.size[0] = [Number.parseInt(data.id_product), req.body.keyInfoProduct, Number.parseInt(req.body.valueInfoProduct)]
    }
    Product.UpdateProduct(req.con, data, (err, result) => {
      if (err) return res.send(err)
      if (result) {
        Product.DeleteSize(req.con, data, (err, resultSize) => {
          if (err) return res.send(err)
          if (resultSize) {
            Product.AddSizeProduct(req.con, data.size, (err, resultSizeAdd) => {
                if (err) return res.send(err)
                if (resultSizeAdd) {
                  Product.DeleteImage(req.con, data.listImgRemove, (err, resultImageRemove) => {
                    if (err) return res.send(err)
                    if (resultImageRemove) {
                      var src = []
                      for (let i in fileName) {
                        src.push([data.id_product, fileName[i], 'product']);
                      }
                      Product.AddImageProduct(req.con, src, (er, resultImageAdd) => {
                        if (err) return res.send(err)
                        if (resultImageRemove) res.redirect('/product');
                      })
                    }
                  })
                }
              }
            )
          }
        })
      }
    })
  }

  deleteProduct(req, res) {
    Product.DeleteProduct(req.con, req.params.id_product, (err, result) => {
      if (err) return res.status(503).json(errorResponse(503,'Server error'))
      Product.DeleteSizeProduct(req.con, req.params.id_product, (err, result) => {
        if (err) return res.status(503).json(errorResponse(503,'Server error'))
        Product.DeleteImageProduct(req.con, req.params.id_product, (err, result) => {
          if (err) return res.send(err)
          return res.status(200).json(successResponse(200))
        })
      })
    })

  }

  info(req, res){
    let data = {}
    Product.ListCategory(req.con, (errCategory, resultCategory) => {
      if (errCategory) return res.status(503).json(errorResponse(503,'Server error'))
      data.category = resultCategory
      Product.ListBrand(req.con, (errBrand, resultBrand) => {
        if (errBrand) return res.status(503).json(errorResponse(503,'Server error'))
        data.brand=resultBrand
        Product.ListStyle(req.con, (errStyle, resultStyle) => {
          if (errStyle) return res.status(503).json(errorResponse(503,'Server error'))
          data.style=resultStyle
          res.status(200).json(successResponse(200, data))
        })
      })
    })
  }

  listBrand(req, res) {
    Product.ListBrand(req.con, (err, result) => {
      if (result) return res.json(result);
    })
  }

  listStyle(req, res) {
    Product.ListStyle(req.con, (err, result) => {
      if (result) return res.json(result);
    })
  }

  listCategory(req, res) {
    Product.ListCategory(req.con, (err, result) => {
      if (result) return res.json(result);
    })
  }

  size(req, res) {
    Product.SizeProduct(req.con, req.params.listID,(err, result) => {
      if (err) return res.status(503).json(errorResponse(503,'Server error'))
      if (result) res.status(200).json(successResponse(200,result))
    })
  }
}

module.exports = ProductController;
