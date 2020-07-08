CREATE DATABASE todo_database;

CREATE TABLE todo(
    todo_id BIGSERIAL PRIMARY KEY,
    description VARCHAR(300)
);