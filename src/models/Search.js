module.exports = {

    SearchNameRange(con,[name,desc,min,max,size,id_category],callback){
        let orderBy ='ASC '
        if(desc && desc === '1') { orderBy = 'DESC '}
        if(desc && desc === '0'){ orderBy = 'ASC '}

        if(size.length >0){console.log(size)}
        if(size.id_category >0){console.log(id_category)}
        const sql = 'SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'WHERE product.name LIKE \'%'+ name +'%\' ' +
            'AND product.export_price >= ' +min+
            ' AND product.export_price <= ' +max+
            ' ORDER BY product.export_price ' +orderBy+
            'LIMIT 0,100';
        con.query(sql,callback)
    },

    SearchNameSize(con,[name,desc,min,max,size,id_category],callback){
        console.log(typeof min,typeof max)
        let orderBy ='ASC '
        let sizeArr =''
        let category =''
        let minRange =''
        let maxRange =''
        if(desc && desc === '1') { orderBy = 'DESC '}
        if(desc && desc === '0'){ orderBy = 'ASC '}
        if(max !== undefined && max !== '0' ){maxRange = 'AND product.export_price <= ' +max+' '}
        if(min !== undefined && min !== '0'){minRange = 'AND product.export_price >= ' +min+' '}
        //if (max !== 0 || min !==0){
          //  if (min) {minRange = 'AND product.export_price <= ' +min+' '}
            //if (max) {maxRange = 'AND product.export_price >= ' +max+' '}
        //}
        if(size.length >0){sizeArr = ' AND size.size_name in (' + con.escape(size)+') '}
        if(id_category.length >0){
            category = ' AND product.id_category in (' + con.escape(id_category)+') '
        }
        const sql = 'SELECT product.id_product,product.name, product.export_price, product.impot_price, product.sale, product.src, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'INNER JOIN size on size.id_product = product.id_product '+
            'WHERE product.name LIKE \'%'+ name +'%\' ' +
            maxRange + minRange + sizeArr + category +
            ' ORDER BY product.export_price ' +orderBy +
            'LIMIT 0,100';

        console.log(sql)
        con.query(sql,callback)
    },

    SearchNameFilter(con,data,callback){
        console.log(data.name)
        const desc = data.price ===0 ? '' : 'DESC '
        const category = !data.id_category.length > 0 ? '' : 'AND product.id_category IN ('+con.escape(data.id_category) +') '
        const sql = 'SELECT product.id_product,product.name,image.src, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN image on image.id_product = product.id_product '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'WHERE product.name LIKE \'%'+ data.name +'%\' '+ category+
            'ORDER BY product.name ' + desc+
            'LIMIT 0,100';
        con.query(sql,callback)
    },

    SearchCategory(con,data,callback){
        const desc = data.price ==='0' ? '' : 'DESC'
        console.log(typeof data.price,desc)
        const sql = 'SELECT product.id_product,product.name,image.src, product.export_price, product.impot_price, product.sale, product.description, category.name_category, brand.brand_name, seasion.style_name FROM product '+
            'INNER JOIN category on category.id_category= product.id_category '+
            'INNER JOIN seasion on seasion.id_style = product.id_style '+
            'INNER JOIN brand on brand.id_brand = product.id_brand '+
            'INNER JOIN image on image.id_product = product.id_product '+
            'WHERE product.id_category IN ('+con.escape(data.id_category) +') ' +
            'ORDER BY product.name ' +desc+
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
