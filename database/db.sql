CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(name, email) 
    VALUES ('William Fabricio', 'wil.fabri777@gmail.com'),
    ('Alejandra Parraga', 'cruzmara9@gmail.com');

SELECT * FROM users;