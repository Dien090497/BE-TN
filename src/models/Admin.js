module.exports = {

    getAdmin(con, [email, password], callback) {
        con.query('SELECT * FROM aeshop.admin WHERE email = ? and password = ?', [email, password], callback)
    },

    getUser(con, [page, size], callback) {
        con.query('SELECT * FROM user ORDER BY id_user DESC limit '+page*size+','+size, callback)
    },

    getIsAdmin(con, [email], callback) {
        con.query('SELECT is_admin FROM admin where id_admin = ?',[email], callback)
    },

    setUserIsAdmin(con, [action, id_user], callback) {
        if (action==='up') return con.query('UPDATE user SET is_admin = 1 WHERE id_user = ?',[id_user], callback)
        return con.query('UPDATE user SET is_admin = 0 WHERE id_user = ?',[id_user], callback)
    },

    setArmin(con, [action, name,id_user,password], callback){
        if (action==='up') return con.query('INSERT INTO admin (name,email,password,is_admin) VALUES(?,?,?,0)',[name,id_user,password], callback)
        return con.query('DELETE FROM admin WHERE email = ?',[id_user], callback)
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
