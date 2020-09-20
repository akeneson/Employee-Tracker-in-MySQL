DROP DATABASE IF EXISTS departmentDB;

CREATE database departmentDB;

USE departmentDB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM departmentDB;
