const router = require("express").Router();
require('dotenv').config()
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const adminMiddleware = require("../middleware/admins.js");

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
            msg: 'Usuário ou senha incorretos 1'
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]['senha'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(401).send({
                msg: 'Usuário ou senha incorretos 2'
              });
            }
            else if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id,
                  userPassword: result[0].password
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
              msg: 'Usuário ou senha incorretos 3'
            });
          }
        );
      }
    );
  });



router.get("/dashboard", adminMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData)
  res.send("Usuário logado.");
}),

module.exports = router;
