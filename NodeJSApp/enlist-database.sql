CREATE DATABASE enlist;

/* Create users table */
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);