const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require ("mysql2");

function execMysqlQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "tcc"
    });

    connection.query(sqlQry, (error, results, fields) =>{
        if(error){
            res.json(error);
        }
        else {
            res.json(results);
        }
        connection.end();
    })
}


app.get("/" , (req, res)=>{
    execMysqlQuery("SELECT * FROM login", res);
})

app.listen(PORT, () =>{
    console.log(`Server em ${PORT}`);
});