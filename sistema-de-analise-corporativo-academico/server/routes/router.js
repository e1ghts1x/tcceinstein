const router = require("express").Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const db = require("../lib/db.js");
const userMiddleware = require("../middleware/admins.js");

router.post('/login', (req, res, next) => {
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
            msg: 'Usuário ou senha incorretos'
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]['senha'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(401).send({
                msg: 'Usuário ou senha incorretos'
              });
            }
            else if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id
                },
                '$carecrow', {
                  expiresIn: '7d'
                }
              );
              return res.status(200).send({
                msg: 'Logado',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Usuário ou senha incorretos'
            });
          }
        );
      }
    );
  });

router.get("/secret", userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData)
  res.send("Usuário logado.");
}),

module.exports = router;
