CREATE DATABASE IF NOT EXISTS invoice_db;
USE invoice_db;

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_address VARCHAR(255),
    products TEXT,
    total_amount FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);