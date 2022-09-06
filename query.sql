CREATE DATABASE tcc;
USE tcc;

CREATE TABLE login(
	id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL);

INSERT INTO login (login, senha) VALUES ("emanuel", md5("root"));