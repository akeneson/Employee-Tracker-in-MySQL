DROP DATABASE IF EXISTS rolesDB;

CREATE database rolesDB;

USE rolesDB;

CREATE TABLE roles (
  id INT NOT NULL,
  -- to hold role title
  title VARCHAR(30) NULL,
  -- to hold role salary
  salary DECIMAL(100) NULL,
  -- to hold reference to department role belongs to
  department_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM roles;