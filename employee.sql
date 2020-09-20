DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;

CREATE TABLE roles (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
--  to hold reference to role employee has
  role_id INT NOT NULL,
--  to hold reference to another employee that manager of the current employee.
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employeeDB;