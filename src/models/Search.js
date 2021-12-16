module.exports = {
    SearchName(con,name,callback){
        const sql = 'SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'WHERE product.name LIKE \'%'+ name +'%\' ORDER BY product.name LIMIT 0,100'
        con.query(sql,callback)
    },

    SearchNameFilter(con,data,callback){
        const desc = data.price ===0 ? '' : 'DESC '
        console.log(typeof data.id_category)
        const category = !data.id_category.length > 0 ? '' : 'AND product.id_category IN ('+con.escape(data.id_category) +') '
        const sql = 'SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'WHERE product.name LIKE \'%'+ data.name +'%\' '+ category+
            'ORDER BY product.name ' + desc+
            'LIMIT 0,100';
        con.query(sql,callback)
    },

    SearchCategory(con,data,callback){
        const desc = data.price ===0 ? '' : 'DESC '
        console.log(typeof data.id_category)
        const sql = 'SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'WHERE product.id_category IN ('+con.escape(data.id_category) +') ' +
            'ORDER BY product.name ' + desc+
            'LIMIT 0,100';
        con.query(sql,callback)
    },

    getPriceMax(con,callback){
        con.query('SELECT MAX(product.export_price) as max FROM product',callback)
    },

    getPriceMin(con,callback){
        con.query('SELECT MIN(product.export_price) as min FROM product',callback)
    }
}
