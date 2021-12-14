module.exports = {

    getAdmin(con, [email, password], callback) {
        con.query('SELECT * FROM aeshop.admin WHERE email = ? and password = ?', [email, password], callback)
    },

    getUser(con, [page, size], callback) {
        con.query('SELECT * FROM user ORDER BY id_user DESC limit '+page*size+','+size, callback)
    },

    countUser(con, callback){
        con.query('SELECT COUNT(*) as count FROM user', callback)
    },

    EditProfile(con,[id_admin, new_password], callback){
        con.query('UPDATE admin set password = ? WHERE id_admin = ?',[new_password,id_admin] ,callback)
    },

    SetToken(con, [id_admin,token], callback){
        con.query('UPDATE admin SET token_firebase = ? WHERE id_admin = ?',[token,id_admin] ,callback)
    },

    selectToken(con, callback){
        con.query('SELECT token_firebase FROM admin WHERE token_firebase is NOT NULL',callback)
    }

}
