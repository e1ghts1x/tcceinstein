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
    
	CREATE TABLE perguntas(
    id_pergunta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pergunta VARCHAR(70));

INSERT INTO admins(admins, senha) VALUES ("scarecrow", "$2y$10$tiMGK7MYPDTg38QmSefilO4Oags5/9wxiHgVHC5u/bmnSK.DxllMe");
INSERT INTO perguntas (pergunta) VALUES ("Are u gay?");
INSERT INTO perguntas (pergunta) VALUES ("Chainsaw man o melhor anime de todos?");
INSERT INTO perguntas (pergunta) VALUES ("E o mangá de chainsaw man, ja leu?");

SELECT * FROM admins;
SELECT * FROM login;
SELECT * FROM perguntas;
