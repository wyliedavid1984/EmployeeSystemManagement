DROP DATABASE IF EXISTS employeedb;
CREATE database employeedb;

USE employeedb;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2) ,
    department_id INT,
    PRIMARY KEY (id)
);

 

CREATE TABLE employee (
  
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

 