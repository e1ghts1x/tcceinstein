const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcryptjs");
//const uuid = require("uuid"); -- CONFIGURAR
const jwt = require("jsonwebtoken");

const {sendConfirmationEmail} = require("../lib/mailer")
const db = require("../lib/db.js");
const adminMiddleware = require("../middleware/admins");
const userMiddleware = require("../middleware/users");

router.post("/loginadmin", (req, res, next) => {
  db.query(
    `SELECT * FROM admins WHERE admins = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Usuário ou senha incorretos.",
        });
      }
      bcrypt.compare(req.body.password, result[0]["senha"], (bErr, bResult) => {
        if (bErr) {
          return res.status(401).send({
            msg: "Usuário ou senha incorretos.",
          });
        } else if (bResult) {
          const token = jwt.sign(
            {
              username: result[0].admins,
              userId: result[0].id_login,
              role: result[0].role
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          );
          return res.status(200).send({
            msg: "Logado",
            token,
            user: result[0].admins,
          });
        }
        return res.status(401).send({
          msg: "Usuário ou senha incorretos.",
        });
      });
    }
  );
});

router.get("/verifyadmin", adminMiddleware.isLoggedIn, (req, res) =>{ 
  return res.status(201).send({
    msg:"Usuário verificado!"
  })
});

router.get("/verifyuser", userMiddleware.isLoggedIn, (req, res) =>{ 
  return res.status(201).send({
    msg:"Usuário verificado!"
  })
});

router.post("/adminlogout", (req,res, next) =>{
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM login WHERE login = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Usuário ou senha incorretos.",
        });
      }
      bcrypt.compare(req.body.password, result[0]["senha"], (bErr, bResult) => {
        if (bErr) {
          return res.status(401).send({
            msg: "Usuário ou senha incorretos.",
          });
        } else if (bResult) {
          const token = jwt.sign(
            {
              username: result[0].login,
              userId: result[0].id_login,
              role: "user"
            },
            process.env.JWT_TOKEN_USER,
            {
              expiresIn: process.env.JWT_EXPIRES,
            }
          );
          return res.status(200).send({
            msg: "Logado",
            token,
            user: result[0],
          });
        }
        return res.status(401).send({
          msg: "Usuário ou senha incorretos.",
        });
      });
    }
  );
});

router.post("/register", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM login where LOWER(login) = LOWER(${db.escape(req.body.username)}) OR LOWER(${db.escape(req.body.email)})`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "O nome de usuário ou email não está disponível.",
        });
      }else {
        sendConfirmationEmail({toUser: req.body, hash: ""})
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          }else {
            db.query(
              `INSERT INTO login(login, email, senha) values (${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Usuário registrado.",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/deletequestion", adminMiddleware.isLoggedIn, (req, res) => {
  db.query(
    `SELECT * FROM perguntas WHERE id_pergunta = ${req.body.id_pergunta}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (!result.length) {
        return res.status(409).send({
          msg: "Pergunta não encontrada no banco de dados.",
        });
      } else {
        db.query(
          `DELETE FROM perguntas WHERE id_pergunta = ${req.body.id_pergunta}`,
          (err, result) => {
            if (err) {
              return res.status(400).send({
                msg: err,
              });
            }
            return res.status(201).send({
              msg: "Pergunta deletada do banco de dados.",
            });
          }
        );
      }
    }
  );
});

router.post("/addquestion", adminMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `INSERT INTO perguntas (pergunta) VALUES ('${req.body.pergunta}')`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "Pergunta cadastrada no banco de dados com sucesso!",
      });
    }
  );
});

router.post("/updatequestion", adminMiddleware.isLoggedIn, (req, res) => {
  db.query(
    `UPDATE perguntas SET pergunta = "${req.body.pergunta}" WHERE id_pergunta = ${req.body.id_pergunta}`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "Pergunta alterada no banco de dados com sucesso!",
      });
    }
  );
});

router.get("/dashboard", adminMiddleware.isLoggedIn, (req, res, next) => {
  res.send("Usuário logado.");
}),

router.get("/formeditor", adminMiddleware.isLoggedIn, (req, res, next) => {
    db.query(`SELECT * FROM perguntas`, (err, result) => {
      if (err) {
        return res.send.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Não existem perguntas no banco de dados...",
        });
      }
      return res.status(201).send({
        result,
      });
    });
});

router.get("/configadminuser", adminMiddleware.isLoggedIn, (req, res, next) => {
  db.query(`SELECT id_login, admins FROM admins`, (err, result) => {
    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "Não existem administradores no sistema.",
      });
    }
    return res.status(201).send({
      result,
    });
  });
});

router.post("/deleteadminuser", adminMiddleware.isLoggedIn, (req, res, next) => {
    db.query(
      `SELECT id_login, admins FROM admins WHERE id_login = ${req.body.id_login};`,
      (err, result) => {
        if (err) {
          throw err;
        }
        if (!result.length) {
          return res.status(409).send({
            msg: "Admin não encontrado no banco de dados.",
          });
        }
        if (result[0].admins === "scarecrow") {
          return res.status(401).send({
            msg: "O usuário padrão não pode ser deletado...",
          });
        }
        if(result[0].admins === req.body.username){
          return res.status(401).send({
            msg: "O usuário atual está logado...",
          });
        }
         else {
          db.query(
            `DELETE FROM admins WHERE id_login = ${req.body.id_login}`,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  msg: err,
                });
              }
              return res.status(201).send({
                msg: "Admin deletado do banco de dados.",
              });
            }
          );
        }
      }
    );
  }
);

router.post("/addadminuser", adminMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `SELECT * FROM admins where LOWER(admins) = LOWER(${db.escape(
      req.body.admins
    )})`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "O nome de admin não está disponível.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            db.query(
              `INSERT INTO admins(admins, senha, role) values (${db.escape(req.body.admins)}, ${db.escape(hash)}, "admin")`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Admin registrado.",
                });
              }
            );
          }
        });
      }
    }
  );
});

module.exports = router;
