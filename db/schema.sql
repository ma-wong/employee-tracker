DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE songs (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  artist VARCHAR(30) NULL,
  genre VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

DROP TABLE songs;

INSERT INTO songs (title, artist, genre)
VALUES ("Solo", "Griz", "EDM");