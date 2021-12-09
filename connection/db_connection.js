const mysql = require("mysql");
require('dotenv').config();

module.exports = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTSQL,
})
