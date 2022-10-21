const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require ("mysql");
const cors = require("cors");
const { response } = require("express");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"tcc"
})

app.post("/api/admin" , (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    db.query("SELECT * FROM admins WHERE admins = ? AND senha = ?", [user, password], (err, result) =>{
        if(err){
            res.send({msg: err});
        } if(result.length > 0){
            res.send(response);
        } else{
            res.send({msg: "Usuário ou senha incorretos."});
        }
    })
})

app.post("/api/login" , (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    db.query("SELECT * FROM login WHERE login = ? AND senha = ?", [user, password], (err, result) =>{
        if(err){
            res.send({msg: err});
        } if(result.length > 0){
            res.send({msg: "Logado com sucesso."});
        } else{
            res.send({msg: "Usuário ou senha incorretos."});
        }
    })
})

app.listen(PORT, () =>{
    console.log(`Server em http://localhost:${PORT}`);
});