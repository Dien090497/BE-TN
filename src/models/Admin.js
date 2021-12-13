module.exports = {

    getAdmin(con, [email, password], callback) {
        con.query('SELECT * FROM aeshop.admin WHERE email = ? and password = ?', [email, password], callback)
    },

    EditProfile(con,[email, new_password], callback){
        con.query('UPDATE admin set password = ? WHERE email = ?',[new_password,email] ,callback)
    },

    SetToken(con, [id_admin,token], callback){
        con.query('UPDATE admin SET token_firebase = ? WHERE id_admin = ?',[token,id_admin] ,callback)
    },

    selectToken(con, callback){
        con.query('SELECT token_firebase FROM admin WHERE token_firebase is NOT NULL',callback)
    }

}
