DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;

CREATE TABLE employee (
  employee_ID INT NOT NULL,
  First_name VARCHAR(30),
  Last_name VARCHAR(30),
--  to hold reference to role employee has
  Role_id INT NOT NULL,
--  to hold reference to another employee that manager of the current employee.
  Manager_id INT NULL,
  PRIMARY KEY (employee_ID)
);

CREATE TABLE department (
  department_ID INT NOT NULL AUTO_INCREMENT,
  -- to hold department name
  Department_name VARCHAR(30),
  PRIMARY KEY (department_ID)
);

CREATE TABLE roles (
  role_ID INT NOT NULL,
  -- to hold role title
  Title VARCHAR(30) NULL,
  -- to hold role salary
  Salary DECIMAL(65) NULL,
  -- to hold reference to department role belongs to
  department_ID INT NULL,
  PRIMARY KEY (role_ID)
);

INSERT INTO employee (employee_ID, First_name, Last_name, Role_id, Manager_id)
VALUES ("1","Amy", "K", "1", "5");

INSERT INTO department (department_ID, Department_name)
VALUES("1", "Alpha");

INSERT INTO roles(role_ID, Title, Salary, department_ID)
VALUES("10","Student", "25", "1");


SELECT * FROM roles;
SELECT * FROM employee;
SELECT * FROM department;