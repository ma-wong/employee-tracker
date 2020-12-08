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

-- selecting to view all employees--
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;



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

-- selecting all roles--
SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id;


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
