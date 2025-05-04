-- Down
DROP TABLE IF EXISTS Users; 

-- Up
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_number VARCHAR(255) NOT NULL,
    address_complement VARCHAR(255), 
    address_city VARCHAR(255) NOT NULL, 
    cep VARCHAR(8) NOT NULL, 
    -- latitude DECIMAL(10, 8) NOT NULL,
    -- longitude DECIMAL(11, 8) NOT NULL,
    notifications_json JSON DEFAULT '{}',
    settings_json JSON DEFAULT '{}',
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
