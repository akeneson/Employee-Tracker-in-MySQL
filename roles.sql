DROP DATABASE IF EXISTS rolesDB;

CREATE database rolesDB;

USE rolesDB;

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(100) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM roles;