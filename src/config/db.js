const mysql = require("mysql");
require('dotenv').config();

module.exports = mysql.createConnection({
    host: 'mysql-51946-0.cloudclusters.net',
    database: 'aeshop',
    user: 'admin',
    password: 'FTEnSAlf',
    port: 17400,
})
