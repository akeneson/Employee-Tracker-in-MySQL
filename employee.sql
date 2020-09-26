DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  department_ID INT NOT NULL AUTO_INCREMENT,
  -- to hold department name
  department_name VARCHAR(30),
  PRIMARY KEY (department_ID)
);

CREATE TABLE roles (
  role_ID INT NOT NULL AUTO_INCREMENT,
  -- to hold role title
  title VARCHAR(30) NULL,
  -- to hold role salary
  salary DECIMAL(65) NULL,
  -- to hold reference to department role belongs to
  department_ID INT NULL,
  PRIMARY KEY (role_ID)
);

CREATE TABLE employee (
  employee_ID INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
--  to hold reference to role employee has
  role_id INT NOT NULL,
--  to hold reference to another employee that manager of the current employee.
  manager_id INT NOT NULL,
  PRIMARY KEY (employee_ID)
);

INSERT INTO department (department_ID, department_name)
VALUES("1", "Mid-Level Provider");

INSERT INTO department (department_ID, department_name)
VALUES("2", "Administration");

INSERT INTO department (department_ID, department_name)
VALUES("3", "Physicians");

INSERT INTO roles(role_ID, title, salary, department_ID)
VALUES("1","Nurse Practitioner", "100000", "1");

INSERT INTO roles(role_ID, title, salary, department_ID)
VALUES("2","Medical Director", "200000", "2");

INSERT INTO roles(role_ID, title, salary, department_ID)
VALUES("3","Anesthesiologist", "400000", "3");

INSERT INTO employee (employee_ID, first_name, last_name, role_id, manager_id)
VALUES ("1","Amy", "Keneson", "1", "1");

INSERT INTO employee (employee_ID, first_name, last_name, role_id, manager_id)
VALUES ("2","Henry", "Van", "2", "2");

INSERT INTO employee (employee_ID, first_name, last_name, role_id, manager_id)
VALUES ("3","Angela", "Brooks", "3", "3");


SELECT * FROM roles;
SELECT * FROM employee;
SELECT * FROM department;