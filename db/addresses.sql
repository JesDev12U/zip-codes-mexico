DROP DATABASE IF EXISTS addressess;

CREATE DATABASE addressess;

USE addressess;

CREATE TABLE registers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cp VARCHAR(5) NOT NULL,
    state VARCHAR(30) NOT NULL,
    zone VARCHAR(30) NOT NULL,
    colony VARCHAR(30) NOT NULL,
    street VARCHAR(30) NOT NULL,
    extnum VARCHAR(10) NOT NULL,
    innum VARCHAR(10) NOT NULL
);