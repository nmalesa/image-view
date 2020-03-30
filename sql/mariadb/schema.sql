CREATE DATABASE IF NOT EXISTS images;

GRANT ALL PRIVILEGES on images.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;

USE images;
SET character_set_client=utf8, character_set_connection=utf8, character_set_database=utf8, character_set_results=utf8, character_set_server=utf8;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  primary_image TEXT NOT NULL,
  video_embed TEXT,
  description TEXT
);

CREATE TABLE thumbnails (
  thumb_id INT PRIMARY KEY AUTO_INCREMENT,
  thumb_1 TEXT,
  thumb_2 TEXT,
  thumb_3 TEXT,
  thumb_4 TEXT,
  thumb_5 TEXT,
  FOREIGN KEY (thumb_id) REFERENCES products(id)
);
