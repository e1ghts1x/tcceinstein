const mysql = require ("mysql");
require("dotenv").config()

const db = mysql.createPool({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

db.getConnection(function (err, connection){
    if(err) throw err
})
module.exports = db