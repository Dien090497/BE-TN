module.exports = {
  GetAllNews(con,[page,size,id_news],callback){
    let sql = ''
    if (!id_news) sql = 'SELECT * FROM news ORDER BY publication_date DESC LIMIT ' + page*size+','+size
    else sql = 'SELECT * FROM news WHERE id_news = '+id_news
    con.query(sql, callback);
  },

  AddNews(con, [title, image,content], callback) {
    con.query('INSERT INTO news(title,image,publication_date,content) VALUES (?,?, NOW(),?)', [title, image, content], callback)
  },

  countNews(con, callback){
    con.query('SELECT COUNT(*) as count FROM news', callback)
  },

  DeleteNews(con,id_news, callback){
    con.query('DELETE FROM news WHERE id_news = '+id_news,callback)
  },

  UpdateNews(con, data, callback) {
    con.query('UPDATE news set ' +
      (data.image? 'image ="'+data.image+'", ' :'') +
      'title = "' +data.title +'"'+
      ', content = "' +data.content +'"'+
      ', publication_date = "' +data.publication_date +'"'+
      'where id_news = ?',
      [parseInt( data.id_news)], callback)
  },

}
