module.exports = {

  ListProduct(con, callback) {
    con.query('SELECT product.*, seasion.style_name,category.name_category,brand.brand_name FROM product ' +
      'INNER JOIN seasion ON product.id_style = seasion.id_style ' +
      'INNER JOIN category ON product.id_category = category.id_category ' +
      'INNER JOIN brand on product.id_brand = brand.id_brand', callback)
  },
  ListImage(con, callback) {
    con.query('SELECT id_product,src FROM image where image_type="product"', callback)
  },

  DetailProduct(con, id_product, callback) {
    con.query('SELECT product.*, seasion.style_name,category.name_category,brand.brand_name ' +
      'FROM product ' +
      'INNER JOIN seasion ON product.id_style = seasion.id_style ' +
      'INNER JOIN category ON product.id_category = category.id_category ' +
      'INNER JOIN brand on product.id_brand = brand.id_brand ' +
      'WHERE id_product = ?', id_product, callback)
  },

  ListImageProduct(con, id_product, callback) {
    con.query('SELECT src FROM image WHERE id_product = ? and image_type = "product"', id_product, callback)
  },
  ListOption(con, table_name, callback) {
    con.query('SELECT * FROM ' + table_name, callback)
  },

  SizeProduct(con, id_product, callback) {
    con.query('SELECT * FROM size WHERE id_product = ?;', id_product, callback)
  },

  AddProduct(con, data, callback) {
    con.query('INSERT INTO product(name,export_price,id_style,id_category,id_brand,create_at,sale,impot_price,description) ' +
      'VALUES(?,?,?,?,?,NOW(),?,?,?);',
      [data.name, data.export_price, data.id_style, data.id_category, data.id_brand, data.sale, data.impot_price, data.description], callback)
  },

  AddSizeProduct(con, data, callback) {
    var sql = 'INSERT INTO size(id_product,size_name,qnt) VALUES ?;'
    con.query(sql, [data], callback);
  },
  AddImageProduct(con, data, callback) {
    var sql = 'INSERT INTO image(id_product,src,image_type) VALUES ?;'
    con.query(sql, [data], callback);
  },


  UpdateProduct(con, data, callback) {
    con.query('UPDATE product ' +
      'set name =?, export_price =? ,impot_price=?, sale=?,id_category=?, id_style=?, id_brand=?, description=? where id_product =?',
      [data.name, data.export_price, data.impot_price,data.sale, data.id_category,  data.id_style, data.id_brand, data.description, data.id_product], callback)
  },
  DeleteSize(con, data, callback) {
    con.query('DELETE FROM size WHERE id_product ='+data.id_product,callback)
  },
  DeleteImage(con, data, callback) {
    con.query('DELETE FROM image WHERE src in (?)',[data],callback)
  },

  DeleteProduct(con,id_product,callback){
    con.query('DELETE FROM size WHERE id_product ='+ id_product,callback);
  },
  DeleteSizeProduct(con,id_product,callback){
    con.query('DELETE FROM image WHERE id_product ='+ id_product,callback);
  },
  DeleteImageProduct(con,id_product,callback){
    con.query('DELETE FROM product WHERE id_product ='+ id_product,callback);
  },

  ListBrand(con,callback){
    con.query('SELECT * FROM brand',callback);
  },

  ListCategory(con,callback){
    con.query('SELECT * FROM category',callback);
  },

  ListStyle(con,callback){
    con.query('SELECT * FROM seasion',callback);
  },
}
