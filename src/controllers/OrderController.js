const Order = require('../models/Order');
const Admin = require("../models/Admin");
const {errorResponse, successResponse} = require("../lib/response");

const admin = require("firebase-admin");
const User = require("../apiClient/models/User");

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
};
/**
 * Class Auth Controller
 */
class OrderController {

    listOrder(res, req){
        Order.getListOrder(req.con,[req.query.page, req.query.size],(err, result)=>{
            if (err) return res.status(503).json(errorResponse(503, 'List Order error',err));
            Order.countBill(req.con,(errCount, resultCount)=>{
                if (errCount) return res.status(503).json(errorResponse(503, 'Count error',errCount));
                return res.status(201).json(successResponse(201, {
                    order: result,
                    count: resultCount[0].count
                }));
            })
        })
    }

    listOrderUser(res, req){
        Order.getListOrderUser(req.con,[req.params.id_user,req.query.page, req.query.size],(err, result)=>{
            if (err) return res.status(503).json(errorResponse(503, 'List Order error',err));
            Order.countBillUser(req.con,req.params.id_user,(errCount, resultCount)=>{
                if (errCount) return res.status(503).json(errorResponse(503, 'Count error',errCount));
                return res.status(201).json(successResponse(201, {
                    order: result,
                    count: resultCount[0].count
                }));
            })
        })
    }

    detailOrder(res, req){
        Order.getDetailOrder(req.con,[Number(req.params.id_bill),Number(req.query.page), Number(req.query.size)],(err, result)=>{
            if (err) return res.status(503).json(errorResponse(503, 'Detail Bill error',err));
            return res.status(200).json(successResponse(200, result));
        })
    }

    setOrder(res, req) {
        Order.setOrder(req.con,req.body,(errBill, resultBill)=>{
            if (errBill) return res.status(503).json(errorResponse(503, 'Bill error',errBill));
            const detailBill = []
            req.body.id_product.map((obj,i)=>{
                detailBill.push([resultBill.insertId,obj, req.body.amount[i],req.body.prices[i], req.body.size[i]]);
            })
            Order.setDetailOrder(req.con, detailBill, (errBillDetail, resultBill)=>{
                if (errBillDetail) return res.status(503).json(errorResponse(503, 'Bill Detail error',errBillDetail));
                Admin.selectToken(req.con,(e,token) =>{
                    if (e) return res.status(503).json(errorResponse(503, 'Token Firebase error',e));
                    const tokenFirebase=[];
                    token.map(obj=>{
                        tokenFirebase.push(obj.token_firebase)
                    })
                    const payload = {
                        notification: {
                            title: '????n h??ng m???i',
                            body: 'B???n c?? m???t ????n h??ng m???i',
                        }
                    };

                    admin.messaging().sendToDevice(tokenFirebase, payload , options)
                      .then((response)=>{
                          console.log('Send Message success!!!', response)
                          add
                      }).catch((err)=>{
                        console.log('Send Message error!!!', err)
                    });
                    return res.status(200).json(successResponse(200));
                })
            })
        })
    }

    editStatusOrder(res, req){
        Order.updateStatus(req.con,[req.body.id_bill, req.body.status],(err, result)=>{
            if (err) return res.status(503).json(errorResponse(503, 'Bill Detail error',err));
            User.getFirebaseToken(req.con, req.body.id_bill,(e,tokens)=>{
                const tokenFirebase = []
                tokenFirebase.push(tokens[0].firebase_token)
                const payload = {
                    notification: {
                        title: 'C???p nh???t ????n h??ng',
                        body: req.body.status==='0' ? '????n h??ng ??ang ch??? x??? l??!!!' : req.body.status==='1' ? '????n h??ng DH' +req.body.id_bill +' ??ang ???????c giao ?????n b???n!!!' : req.body.status==='2' ? 'Thanh to??n th??nh c??ng!!!' : '????n h??ng HD'+req.body.id_bill  +' ???? h???y!!!'
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

    editAddress(res, req){
        Order.editAddress(req.con,[req.params.id_bill,req.body.address],(err,data)=>{
            if (err) return res.status(503).json(errorResponse(503, 'Bill Address error',err));
            return res.status(200).json(successResponse(200,data));
        })
    }

    setQntProduct(res, req){
        if (req.body.type === 'add'){
            Order.addQntProduct( req.con,[req.body.qnt,req.body.id_product,req.body.size_name],(err,stt)=>{
                if (err) return res.status(503).json(errorResponse(503, 'Bill Address error',err));
                if (stt.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
                return res.status(200).json(successResponse(200, {message: 'OK'}));
            })
        }   else {
            Order.removeQntProduct( req.con,[req.body.qnt,req.body.id_product,req.body.size_name],(err,stt)=>{
                if (err) return res.status(503).json(errorResponse(503, 'Error',err));
                if (stt.affectedRows === 0) return res.status(403).json(errorResponse(403, 'Not Found'));
                return res.status(200).json(successResponse(200, {message: 'OK'}));

            })
        }
    }


}

module.exports = OrderController;
