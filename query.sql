CREATE DATABASE tcc;
USE tcc;


CREATE TABLE login(
	id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
	email varchar(50) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL);
    
    CREATE TABLE admins(
	id_login INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    admins VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL);

INSERT INTO admins(admins, senha) VALUES ("scarecrow", "$2y$10$tiMGK7MYPDTg38QmSefilO4Oags5/9wxiHgVHC5u/bmnSK.DxllMe");

SELECT * from admins;
SELECT * FROM login;