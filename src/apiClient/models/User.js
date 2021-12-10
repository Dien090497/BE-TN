module.exports = {
    Register(con, data, callback) {
        con.query('INSERT INTO aeshop.user(id_user,name,password,token) VALUES(?,?,?,?);', [data.id_user, data.name, data.password,data.token], callback)
    },
    addToken(con, data, callback) {
        con.query('UPDATE aeshop.user set token = ? WHERE id_user = ?', [data.token, data.id_user], callback)
    },

    RegisterOrther(con, [id_user, name, avatar], callback) {
        con.query('INSERT INTO aeshop.user(id_user,name,avatar) VALUES(?,?,?);', [id_user, name, avatar], callback)
    },

    LoginPhoneNumber(con, [id_user, password], callback) {
        con.query('SELECT * FROM aeshop.user WHERE id_user = ? AND password = ?', [id_user, password], callback)
    },
    Login(con, [id_user], callback) {
        con.query('SELECT * FROM aeshop.user WHERE id_user = ?', [id_user], callback)
    },
}
