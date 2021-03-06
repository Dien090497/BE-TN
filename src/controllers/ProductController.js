const Product = require('../models/Product');
const {successResponse}=require('./../lib/response')
const {errorResponse} = require("../lib/response");
/**
 * Class PRODUCT Controller
 */
class ProductController {

  listProduct(req, res) {
    Product.ListProduct(req.con,[req.query.page, req.query.size] ,(err, resultProduct) => {
      if (err) return res.status(503).json(errorResponse(503, 'Server error',err));
      Product.countProduct(req.con,(err, count)=>{
        if (err) return res.status(503).json(errorResponse(503, 'Server error'));
        return res.status(200).json(successResponse(200,{
          count: count[0].count,
          products: resultProduct
        }));
      })
    })
  }

  getProduct(req, res){
    Product.Product(req.con,[req.params.id_product] ,(err, resultProduct) => {
      if (err) return res.status(503).json(errorResponse(503, 'Server error',err));
      if (resultProduct.length > 1){
        const size = []
        const qnt = []
        const image = []
        resultProduct.map(obj=>{
          size.push(obj.size_name)
          qnt.push(obj.qnt)
          image.push(obj.src)
        })
        resultProduct[0].qnt = Array.from(new Set(qnt));
        resultProduct[0].size = Array.from(new Set(size));
        resultProduct[0].src = Array.from(new Set(image));
        return res.status(201).json(successResponse(201, resultProduct[0]));
      }else {
        resultProduct[0].qnt = [resultProduct[0].qnt];
        resultProduct[0].size = [resultProduct[0].size_name];
        resultProduct[0].src = [resultProduct[0].src];
        return res.status(201).json(successResponse(201, resultProduct[0]));
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
    const data = req.body;
    if (req.files.length > 0) {
      data.srcImg = req.files.map(function (item, index) {
        return `uploads/` + item.filename;
      });
    }

    data.id_product = req.params.id_product;
    const newSize = []
    const arrSize = req.body.size.split(',')
    const arQnt = req.body.qnt.split(',')
    for (let i in arrSize) {
      newSize.push([Number.parseInt(data.id_product), arrSize[i], Number.parseInt(arQnt[i])]);
    }
    data.size = newSize
    let image = null
    if (req.files.length> 0){image = req.files[0].filename}
    Product.UpdateProduct(req.con, [data,image], (errProduct, result) => {
      if (errProduct) return res.status(503).json(errorResponse(503, 'Update Product Error', errProduct));
      if (result) {
        Product.DeleteSize(req.con, data, (errDeleteSize, resultSize) => {
          if (errDeleteSize) return res.status(503).json(errorResponse(503, 'Delete Size Error', errDeleteSize));
          if (resultSize) {
            Product.AddSizeProduct(req.con, data.size, (errAddSize, resultSizeAdd) => {
                if (errAddSize) return res.status(503).json(errorResponse(503, 'Add Size Error', errAddSize));
                if (resultSizeAdd) {
                  if (req.files.length > 0){
                    Product.DeleteImage(req.con, data, (errDeleteImg, resultImageRemove) => {
                      if (errDeleteImg) return res.status(503).json(errorResponse(503, 'Delete Img Error', errDeleteImg));
                      if (resultImageRemove) {
                        var src = []
                        for (let objSrc of data.srcImg) {
                          src.push([data.id_product, objSrc, 'product']);
                        }
                        Product.AddImageProduct(req.con, src, (errAddImg, resultImageAdd) => {
                          if (errAddImg) return res.status(503).json(errorResponse(503, 'Delete Img Error', errAddImg));
                          return res.status(204).json(successResponse(204, {message: 'OK'}));
                        })
                      }
                    })
                  }else {
                    return res.status(204).json(successResponse(240, {message: 'OK'}));
                  }
                }
              }
            )
          }
        })
      }
    })
  }

  deleteProduct(req, res) {
    Product.FindProductInBill(req.con,req.params.id_product,(e,d)=>{
      if (e) return res.status(503).json(errorResponse(503,'Server error',e))
      if (d.length > 0) return res.status(201).json(successResponse(201,{message:'forbidden'}))
      Product.DeleteProduct(req.con, req.params.id_product, (err, result) => {
        if (err) return res.status(503).json(errorResponse(503,'Server error',err))
        Product.DeleteSizeProduct(req.con, req.params.id_product, (errSize, result) => {
          if (errSize) return res.status(503).json(errorResponse(503,'Server error',errSize))
          Product.DeleteImageProduct(req.con, req.params.id_product, (errImg, result) => {
            if (errImg) return res.status(503).json(errorResponse(503,'Img error',errImg))
            return res.status(200).json(successResponse(200,{message:'OK'}))
          })
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
    Product.ListBrandProduct(req.con, [req.params.id_brand,req.query.page,req.query.size],(err, result) => {
      if (err) return res.status(503).json(errorResponse(503,'Img error',err))
      Product.ListImage(req.con, (errImg, resultImage) => {
        if (errImg) return res.status(503).json(errorResponse(503, 'Server error',errImg));
        if (resultImage) {
          for (var i = 0; i < result.length; i++) {
            result[i].src = []
            for (var j = 0; j < resultImage.length; j++) {
              if (result[i].id_product === resultImage[j].id_product) {
                result[i].src.push(resultImage[j].src);
              }
            }
          }
          return res.status(200).json(successResponse(200,{
            products: result
          }));
        }
      })
    })
  }

  listCategory(req, res) {
    Product.ListCategoryProduct(req.con, [req.params.id_category,req.query.page,req.query.size],(err, result) => {
      if (err) return res.status(503).json(errorResponse(503,'Img error',err))
      Product.ListImage(req.con, (errImg, resultImage) => {
        if (errImg) return res.status(503).json(errorResponse(503, 'Server error',errImg));
        if (resultImage) {
          for (var i = 0; i < result.length; i++) {
            result[i].src = []
            for (var j = 0; j < resultImage.length; j++) {
              if (result[i].id_product === resultImage[j].id_product) {
                result[i].src.push(resultImage[j].src);
              }
            }
          }
          return res.status(200).json(successResponse(200,{
            products: result
          }));
        }
      })
    })
  }

  listStyle(req, res) {
    Product.ListStyleProduct(req.con, [req.params.id_style,req.query.page,req.query.size],(err, result) => {
      if (err) return res.status(503).json(errorResponse(503,'Img error',err))
      Product.ListImage(req.con, (errImg, resultImage) => {
        if (errImg) return res.status(503).json(errorResponse(503, 'Server error',errImg));
        if (resultImage) {
          for (var i = 0; i < result.length; i++) {
            result[i].src = []
            for (var j = 0; j < resultImage.length; j++) {
              if (result[i].id_product === resultImage[j].id_product) {
                result[i].src.push(resultImage[j].src);
              }
            }
          }
          return res.status(200).json(successResponse(200,{
            products: result
          }));
        }
      })
    })
  }

  category(req, res) {
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
