-- creacion de la base de datos
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;


-- usar
USE moviesdb;

-- crear la tabla movies
  CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
  );
  
  CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
  );
  
  CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
  );
  
  INSERT INTO genre (name) VALUES
  ('Drama'),
  ('Action'),
  ('Crime'),
  ('Adventure'),
  ('Sci-fi'),
  ('Romance'),
  ('Comedy'),
  ('Fantasy'),
  ('Horror'),
  ('Mystery'),
  ('Thriller');
  
  INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
  (UUID_TO_BIN(UUID()), "Interestellar" , 2014 , "Christopher Nolan", 169, "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg", 8.6 ),
  (UUID_TO_BIN(UUID()), "Inception" , 2010 , "Christopher Nolan", 169, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8 ),
  (UUID_TO_BIN(UUID()), "Gladiator" , 2000 , "Ridley Scott", 155, "https://img.fruugo.com/product/0/60/14417600_max.jpg", 8.5 );
  
  INSERT INTO movie_genres (movie_id, genre_id)
  VALUES
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
	((SELECT id FROM movie WHERE title = 'Interestellar'), (SELECT id FROM genre WHERE name = 'Drama')),
	((SELECT id FROM movie WHERE title = 'Interestellar'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
	((SELECT id FROM movie WHERE title = 'Gladiator'), (SELECT id FROM genre WHERE name = 'Action'));
    
    
SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;
  
  
  

