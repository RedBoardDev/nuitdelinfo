DROP DATABASE IF EXISTS websiteNI;

CREATE DATABASE websiteNI;

USE websiteNI;

CREATE TABLE `user` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `username` VARCHAR(30) NOT NULL DEFAULT "0",
    `quest_id` INT unsigned NOT NULL DEFAULT 0,
    `sida_status` TINYINT NOT NULL DEFAULT 0,
    `custom_profil` VARCHAR(10) NOT NULL DEFAULT "0",
    `refresh_token` VARCHAR(256) NOT NULL DEFAULT "0"
);

GRANT ALL ON websiteNI.* to WEBSITE@'%' IDENTIFIED BY 'password-NI';
