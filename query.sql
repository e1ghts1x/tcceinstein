CREATE DATABASE tcc;
USE tcc;


CREATE TABLE login(
	id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL);
    
CREATE TABLE admins(
	id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admins VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL);

INSERT INTO login (login, senha) VALUES ("emanuel", "root");
INSERT INTO admins(admins, senha) VALUES ("bow", "root");

select * from login;