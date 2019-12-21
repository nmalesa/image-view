DROP DATABASE IF EXISTS images;

CREATE DATABASE images;

USE images;
SET character_set_client=utf8, character_set_connection=utf8, character_set_database=utf8, character_set_results=utf8, character_set_server=utf8;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  primary_image INT NOT NULL,
  video_embed TEXT,
  description TEXT
);

CREATE TABLE thumbnails (
  thumb_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  thumb_1 TEXT,
  thumb_2 TEXT,
  thumb_3 TEXT,
  thumb_4 TEXT,
  thumb_5 TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


-- CREATE TABLE items (
--     id INT PRIMARY KEY,
--     box_number TEXT,
--     product_description TEXT,
--     product_size TEXT,
--     care_instructions TEXT,
--     environment_and_materials TEXT,
--     package_details TEXT
-- );
--
-- CREATE TABLE reviews (
--     review_id INT PRIMARY KEY AUTO_INCREMENT,
--     product_id INT,
--     user_name TEXT,
--     posted_date DATE,
--     review_title TEXT,
--     review_text TEXT,
--     overall_rating INT,
--     product_value_for_money INT,
--     product_quality INT,
--     product_appearance INT,
--     product_ease_of_assembly INT,
--     product_works_as_expected INT,
--     review_helpful_yes INT,
--     review_helpful_no INT,
--     product_recommended TINYINT(1),
--     FOREIGN KEY(product_id) REFERENCES items(id)
-- );
