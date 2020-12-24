DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER(30),
  manager_id INTEGER(10) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee;

DROP TABLE employee;

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Scott", 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 6, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Holly", "Flax", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stanley", "Hudson", 6, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toby", "Flenderson", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 10, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone", 10, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Oscar", "Martinez", 4, 1);


DELETE FROM employee
WHERE id = 10;

SELECT employee.id, employee.first_name, role.title
FROM employee INNER JOIN role
ON employee.role_id = role.id;

-- selecting to view all employees--
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name 
FROM employee 
	INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;

-- selecting to view all employees and departments --
SELECT employee.first_name, employee.last_name, department.dept_name
FROM employee
	INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    WHERE department.dept_name = ?;
    

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
VALUES ("software engineer", 150000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("sales lead", 120000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("HR rep", 75000.00, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("financial advisor", 140000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("mechanical engineer", 175000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("sales representative", 100000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("loan processor", 80000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("patent atourney", 200000.00, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Branch Manager", 230000.00, 6);

INSERT INTO role (title, salary, department_id)
VALUES ("accountant", 130000.00, 3);





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

INSERT INTO department (dept_name)
VALUES ("Human Resources");

INSERT INTO department (dept_name)
VALUES ("Managers");

SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id;