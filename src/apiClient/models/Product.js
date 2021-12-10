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

  ListImageProduct(con, id_product,callback) {
    con.query('SELECT src FROM image WHERE id_product = ? and image_type = "product"', id_product,callback)
  },

}
