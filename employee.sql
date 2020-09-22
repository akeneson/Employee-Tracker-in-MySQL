DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;

CREATE TABLE employee (
  ID INT NOT NULL,
  First_name VARCHAR(30) NULL,
  Last_name VARCHAR(30) NULL,
--  to hold reference to role employee has
  Role_id INT NOT NULL,
--  to hold reference to another employee that manager of the current employee.
  Manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  ID INT NOT NULL,
  -- to hold department name
  Name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  ID INT NOT NULL,
  -- to hold role title
  Title VARCHAR(30) NULL,
  -- to hold role salary
  Salary DECIMAL(65) NULL,
  -- to hold reference to department role belongs to
  Department_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM roles;
SELECT * FROM employee;
SELECT * FROM department;