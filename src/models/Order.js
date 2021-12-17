module.exports = {

  getListOrder(con,[page, pageSize], callback){
    con.query('SELECT bill.id_bill,bill.delivery_address,bill.payment_methods,bill.status, user.name, bill.create_at, user.phone_number FROM bill INNER JOIN user ON bill.id_user = user.id_user ORDER BY id_bill limit ' +page*pageSize+','+pageSize, callback)
  },

  getDetailOrder(con,[idBill,page,size], callback){
    con.query('SELECT product.name, bill_detail.prices, bill_detail.size, bill_detail.amount,bill.status, bill.delivery_address FROM bill ' +
      'INNER JOIN bill_detail ON bill_detail.id_bill= bill.id_bill ' +
      'INNER JOIN product ON bill_detail.id_product = product.id_product '+
      'WHERE bill_detail.id_bill = ? ' +
      'ORDER BY bill_detail.id_bill_detail LIMIT ?,?',[idBill,page,size], callback)
  },

  setOrder(con,data, callback) {
    con.query('INSERT INTO bill (bill.id_user,bill.delivery_address,bill.payment_methods,bill.status,bill.create_at) VALUES (?, ?, ?, ?, now())',[data.id_user, data.delivery_address, data.payment_methods, data.status], callback)
  },

  setDetailOrder(con,detailBill, callback) {
    var sql = 'INSERT INTO bill_detail (bill_detail.id_bill ,bill_detail.id_product, bill_detail.amount, bill_detail.prices, bill_detail.size) VALUES ?'
    con.query(sql, [detailBill], callback);
  },

  removeQntProduct(){
    con.query(sql, [detailBill], callback);
  },

  addQntProduct(){

  },

  countBill(con, callback){
    con.query('SELECT COUNT(*) as count FROM bill', callback)
  },

  updateStatus(con,[id_bill, status], callback){
    con.query('UPDATE bill set status = ? WHERE id_bill = ?',[status,id_bill] ,callback)
  },

  editAddress(con,[id_bill, address], callback){
    con.query('UPDATE bill set delivery_address = ? WHERE id_bill = ?',[address,id_bill] ,callback)
  }
}
