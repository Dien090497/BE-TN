const Search = require('../models/Search');
const {successResponse, errorResponse}=require('./../lib/response')
/**
 * Class PRODUCT Controller
 */
class SearchController {
        searchName(req,res){
            Search.SearchName(req.con,req.params.name,(err,result)=>{
                if (err) return res.status(404).json(errorResponse(404, 'Not Fount', err));
                return res.status(200).json(successResponse(200, result));
            })
        }

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
    }

module.exports = SearchController;
