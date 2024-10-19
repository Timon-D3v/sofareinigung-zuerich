CREATE SCHEMA `zaki` ;

CREATE TABLE `zaki`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `family_name` VARCHAR(45) NOT NULL,
  `review` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT '/img/logo.jpg',
  `date` VARCHAR(45) NOT NULL,
  `rating` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = 'This table holds all the comments for the website sofareinigung-zuerich.ch';

ALTER TABLE `zaki`.`comments` 
CHANGE COLUMN `email` `email` VARCHAR(128) NOT NULL ,
CHANGE COLUMN `name` `name` VARCHAR(32) NOT NULL ,
CHANGE COLUMN `family_name` `family_name` VARCHAR(64) NOT NULL ,
CHANGE COLUMN `review` `review` VARCHAR(4096) NOT NULL ,
CHANGE COLUMN `image` `image` VARCHAR(1024) NOT NULL DEFAULT '/img/logo.jpg' ,
CHANGE COLUMN `date` `date` DATE NOT NULL ,
CHANGE COLUMN `rating` `rating` INT NOT NULL ;

CREATE TABLE `zaki`.`options` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` LONGTEXT NOT NULL,
  `value` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = 'This table holds all the information that needs to be able to be changed.';
