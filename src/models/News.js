module.exports = {
  GetNews(con,callback){
    const sql = 'INSERT INTO contetn_news(content,image,id_news) VALUES ?;';
    con.query(sql, [data], callback);
  },

  AddNews(con, [title, image], callback) {
    con.query('INSERT INTO news(title,image,publication_date) VALUES (?,?, NOW())', [title, image], callback)
  },

  AddContentNews(con, data, callback) {
    const sql = 'INSERT INTO contetn_news(content,image,id_news) VALUES ?;';
    con.query(sql, [data], callback);
  },

}
