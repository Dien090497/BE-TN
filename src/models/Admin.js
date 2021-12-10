module.exports = {

    getAdmin(con, [email, password], callback) {
        con.query('SELECT * FROM aeshop.admin WHERE email = ? and password = ?', [email, password], callback)
    },

    EditProfile(con,[email, new_password], callback){
        con.query('UPDATE admin set password = ? WHERE email = ?',[new_password,email] ,callback)
    }

}
