const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = {
  validateRegister: (req, res, next) => {
    if (!req.body.username || req.body.username.length < 5) {
      return res.status(400).send({
        msg: "O usuário precisa ter 5 caracteres ou mais.",
      });
    }
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send({
        msg: "A senha precisa conter 8 caracteres ou mais.",
      });
    }
    if (!req.body.email || !req.body.email.includes("@")){
      return res.status(400).send({
        msg: "O email precisa ser válido.",
      })
    }
    next();
  },

  isLoggedIn: (req, res, next) => {
    try {
      const tokenUser = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(tokenUser, process.env.JWT_TOKEN_USER);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Sua sessão não é valida",
      });
    }
  },
};

