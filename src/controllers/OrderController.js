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
                            title: 'Đơn hàng mới',
                            body: 'Bạn có một đơn hàng mới',
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
                        title: 'Cập nhật đơn hàng',
                        body: req.body.status==='0' ? 'Đơn hàng đang chờ xử lý!!!' : req.body.status==='1' ? 'Đơn hàng DH' +req.body.id_bill +' đang được giao đến bạn!!!' : req.body.status==='2' ? 'Thanh toán thành công!!!' : 'Đơn hàng HD'+req.body.id_bill  +' đã hủy!!!'
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


}

module.exports = OrderController;
