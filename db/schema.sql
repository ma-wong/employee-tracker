DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER(10),
  manager_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee;

DROP TABLE employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1);




CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER(10),
    PRIMARY KEY (id)
);

SELECT * FROM role;

DROP TABLE role;

INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", "100K", 1);




CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

SELECT * FROM department;

DROP TABLE department;

INSERT INTO department (dept_name)
VALUES ("Engineer");

INSERT INTO department (dept_name)
VALUES ("Sales");

INSERT INTO department (dept_name)
VALUES ("Finance");

INSERT INTO department (dept_name)
VALUES ("Legal");