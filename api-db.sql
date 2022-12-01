DROP DATABASE IF EXISTS websiteNI;

CREATE DATABASE websiteNI;

USE websiteNI;

CREATE TABLE `user` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(30) NOT NULL DEFAULT "",
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `quest_id` INT unsigned NOT NULL DEFAULT 0,
    `username` VARCHAR(10) NOT NULL DEFAULT "",
    `refresh_token` VARCHAR(256) NOT NULL DEFAULT "",
);

GRANT ALL ON websiteNI.* to APIDBNI@'%' IDENTIFIED BY 'password-websiteNI';
