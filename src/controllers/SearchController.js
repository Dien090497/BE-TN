const Search = require('../models/Search');
const {successResponse, errorResponse}=require('./../lib/response')
const {Product} = require("../models/Product");
/**
 * Class PRODUCT Controller
 */
class SearchController {

        searchNameFilter(req,res){
            let idCategory = [];
            if (req.query.id_category){
                idCategory = req.query.id_category.split(',')
                idCategory.map((obj,i)=>{
                    idCategory[i] = parseInt(obj)
                })
            }
            const data = {
                id_category: idCategory,
                name: req.query.name,
                price: req.query.price,
            }
            if (data.name){
                Search.SearchNameFilter(req.con,data,(err,result)=>{
                    if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                    return res.status(200).json(successResponse(200, result));
                })
            }else {
                Search.SearchCategory(req.con,data,(err,result)=>{
                    if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                    return res.status(200).json(successResponse(200, result));
                })
            }
        }

        async getMaxMinPrice(req, res) {
            Search.getPriceMax(req.con,(err,max)=>{
                if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                Search.getPriceMin(req.con,(errMin,min)=>{
                    if (errMin) return res.status(404).json(errorResponse(404, 'Not Fount', errMin));
                    const data ={
                        max: max[0].max,
                        min: min[0].min
                    }
                    return res.status(200).json(successResponse(200, data));
                })
            })
        }

        searchNameRange(req,res){
            Search.SearchNameRange(req.con,[req.params.name,req.query.price, req.query.min, req.query.max],(err,result)=>{
                if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                return res.status(200).json(successResponse(200, result));
            })
        }

        searchNameSize(req,res){
            let size = []
            let category = []
            if (req.query.size){
                size = req.query.size.split(',');
            }
            if (req.query.id_category){
                category = req.query.id_category.split(',');
            }
            const idCategory =[]
            category.map(id=>{
                idCategory.push(parseInt(id))
            })
            console.log(req.query.min, req.query.max)
            Search.SearchNameSize(req.con,[req.params.name,req.query.price, req.query.min, req.query.max, size,idCategory],(err,result)=>{
                if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                if (result.length > 0){
                    const product =[];
                    result.map(obj=> product.push(obj.id_product))
                    const idProduct = Array.from(new Set(product))
                    const data =[]
                    idProduct.map(id=>{
                        for (const obj of result) {
                            if (obj.id_product === id) {
                                return data.push(obj)
                            }
                        }
                    })
                    return res.status(200).json(successResponse(200, data));
                }else {
                    return res.status(200).json(successResponse(200, result));
                }
            })
        }
    }

module.exports = SearchController;
