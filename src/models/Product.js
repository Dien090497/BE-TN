module.exports = {

  ListProduct(con,[page, pageSize], callback) {
    con.query('SELECT product.*, seasion.style_name,category.name_category,brand.brand_name FROM product ' +
      'INNER JOIN seasion ON product.id_style = seasion.id_style ' +
      'INNER JOIN category ON product.id_category = category.id_category ' +
      'INNER JOIN brand on product.id_brand = brand.id_brand ORDER BY product.id_product DESC limit '+page*pageSize+','+pageSize, callback)
  },

  Product(con,[id_product], callback) {
    con.query('SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.description, product.id_category, category.name_category, product.create_at, product.id_brand, brand.brand_name, product.id_style, seasion.style_name, size.size_name, size.qnt, image.src FROM product ' +
      'INNER JOIN category on category.id_category= product.id_category ' +
      'INNER JOIN seasion on seasion.id_style = product.id_style ' +
      'INNER JOIN brand on brand.id_brand = product.id_brand ' +
      'INNER JOIN size on size.id_product = product.id_product ' +
      'INNER JOIN image on image.id_product = product.id_product ' +
      'where product.id_product = '+id_product, callback)
  },

  countProduct(con, callback){
    con.query('SELECT COUNT(*) as count FROM product', callback)
  },

  ListImage(con, callback) {
    con.query('SELECT id_product,src FROM image where image_type="product"', callback)
  },

  ProductImage(con, id_product ,callback) {
    con.query('SELECT src FROM image where id_product = '+id_product, callback)
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

  ListImageProductId(con, id_product, callback) {
    con.query('SELECT src FROM image WHERE id_product in '+con.escape(id_product), id_product, callback)
  },

  SizeProduct(con, arr, callback) {
    const listID = arr.split(',');
    con.query('SELECT id_product,size_name,qnt FROM size WHERE id_product IN ('+ con.escape(listID) +');', callback)
  },

  AddProduct(con, data, callback) {
    con.query('INSERT INTO product(name,export_price,id_style,id_category,id_brand,create_at,sale,impot_price,description,src) VALUES(?,?,?,?,?,NOW(),?,?,?,?);',
      [
        data.name,
        Number(data.export_price),
        parseInt(data.id_style),
        parseInt(data.id_category),
        parseInt(data.id_brand),
        Number(data.sale),
        Number(data.impot_price),
        data.description,
        data.src[0]
      ], callback)
  },

  AddSizeProduct(con, data, callback) {
    var sql = 'INSERT INTO size(id_product,size_name,qnt) VALUES ?;'
    con.query(sql, [data], callback);
  },
  AddImageProduct(con, data, callback) {
    var sql = 'INSERT INTO image(id_product,src,image_type) VALUES ?;'
    con.query(sql, [data], callback);
  },


  UpdateProduct(con, [data,image], callback) {
    con.query('UPDATE product set ' +
      (data.name? 'name ="'+data.name+'", ' :'') +
      (data.export_price ? 'export_price = '+data.export_price+' ,' : '') +
      (data.impot_price ? 'impot_price= '+data.impot_price+',' : '') +
      (data.sale ? ' sale= '+data.sale+',' : '') +
      (data.id_category ? 'id_category= '+data.id_category+', ' : '') +
      (data.id_style ? 'id_style= '+data.id_style+', ' : '') +
      (image ? 'src= '+con.escape('/uploads/'+image)+', ' : '') +
      (data.id_brand ? 'id_brand= '+data.id_brand+',' : '') +
      (data.description ? 'description= '+con.escape(data.description)+' ' :  'description='+'"Kh??ng c?? mi??u t???"'+' ') +
      'where id_product =?',
      [parseInt( data.id_product)], callback)
  },

  DeleteSize(con, data, callback) {
    con.query('DELETE FROM size WHERE id_product ='+data.id_product,callback)
  },

  // DeleteImage(con, data, callback) {
  //   con.query('DELETE FROM image WHERE src in (?)',[data],callback)
  // },
  DeleteImage(con, data, callback) {
    con.query('DELETE FROM image WHERE id_product = ?',[data.id_product],callback)
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

  FindProductInBill(con,id_product,callback){
    con.query('SELECT * FROM bill_detail where id_product ='+ id_product,callback);
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


  ListBrandProduct(con,[id_brand,page,size],callback){
    con.query('SELECT * FROM product WHERE id_brand = '+id_brand+' ORDER BY create_at DESC limit '+page*size+','+size,callback);
  },

  ListCategoryProduct(con,[id_category,page,size],callback){
    con.query('SELECT * FROM product WHERE id_category = '+id_category+' ORDER BY create_at DESC limit '+page*size+','+size,callback);
  },

  ListStyleProduct(con,[id_style,page,size],callback){
    con.query('SELECT * FROM product WHERE id_style = '+id_style+' ORDER BY create_at DESC limit '+page*size+','+size,callback);
  },
}
