const router = require("express").Router();
require('dotenv').config()
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const adminMiddleware = require("../middleware/admins.js");
const userMiddleware = require("../middleware/users")

router.post('/loginadmin', (req, res, next) => {
  db.query(
    `SELECT * FROM admins WHERE admins = ${db.escape(req.body.username)};`,
    (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Usuário ou senha incorretos.'
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]['senha'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(401).send({
                msg: 'Usuário ou senha incorretos.'
              });
            }
            else if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id,
                  userPassword: result[0].password,
                  role: "admin",
                },
                process.env.JWT_TOKEN, {
                  expiresIn: process.env.JWT_EXPIRES
                }
              );
              return res.status(200).send({
                msg: 'Logado',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Usuário ou senha incorretos.'
            });
          }
        );
      }
    );
  });

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM login WHERE login = ${db.escape(req.body.username)};`,
    (err, result) => {
        if (err) {
          return res.status(400).send({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Usuário ou senha incorretos.'
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]['senha'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(401).send({
                msg: 'Usuário ou senha incorretos.'
              });
            }
            else if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id,
                  userPassword: result[0].password,
                  role: "user"
                },
                process.env.JWT_TOKEN_USER, {
                  expiresIn: process.env.JWT_EXPIRES
                }
              );
              return res.status(200).send({
                msg: 'Logado',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Usuário ou senha incorretos.'
            });
          }
        );
      }
    );
  });

router.post("/register", userMiddleware.validateRegister, (req, res, next) => {
  db.query(`SELECT * FROM login where LOWER(login) = LOWER(${db.escape(req.body.username)})`,
  (err,result) =>{
    if(result.length){
      return res.status(409).send({
        msg: "O nome de usuário não está disponível."
      })
    }
    else{
      bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
          return res.status(500).send({
            msg: err
          })
        } else{
          db.query(`INSERT INTO login(login, email, senha) values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(hash)})`,
          (err, result) =>{
            if(err){
              return res.status(400).send({
                msg: err
              })
            } return res.status(201).send({
              msg: "Usuário registrado."
            })
          })
        }
      })
    }
  })
})

router.post("/deletequestion", adminMiddleware.isLoggedIn, (req, res) => {
  db.query(`SELECT * FROM perguntas WHERE id_pergunta = ${req.body.id_pergunta}`,
  (err, result) =>{
    if(err){
      throw err
    }
    if(!result.length){
      return res.status(409).send({
        msg: "Pergunta não encontrada no banco de dados."
      })
    }
  else{
    db.query(`DELETE FROM perguntas WHERE id_pergunta = ${req.body.id_pergunta}`,
    (err, result) =>{
      if(err){
        return res.status(400).send({
          msg: err
        })
      }return res.status(201).send({
        msg: "Pergunta deletada do banco de dados."
      })
    })
  }
  })
})

router.get("/dashboard", adminMiddleware.isLoggedIn, (req, res, next) => {
  res.send("Usuário logado.");
}),

router.get("/formeditor", adminMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `SELECT * FROM perguntas`,
    (err, result) => {
      if(err) {
        return res.send.status(400).send({
          msg:err
        });
      }
      if(!result.length){
        return res.status(401).send({
          msg: "Não existem perguntas no banco de dados..."
        })
      }
      return res.status(201).send({
        result
      })
    }
  )
})

module.exports = router;
