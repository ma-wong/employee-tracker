DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id VARCHAR(30) NOT NULL,
  manager_id INTEGER NULL,
  PRIMARY KEY (id)
);

DROP TABLE songs;

INSERT INTO songs (title, artist, genre)
VALUES ("Solo", "Griz", "EDM");