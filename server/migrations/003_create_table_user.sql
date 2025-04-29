-- Down
DROP TABLE IF EXISTS User; 

-- Up
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) UNIQUE NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_number VARCHAR(255) NOT NULL,
    address_complement VARCHAR(255), 
    address_city VARCHAR(255) NOT NULL, 
    cep VARCHAR(8) NOT NULL, 
    notifications_json JSON DEFAULT '{}',
    settings_json JSON DEFAULT '{}',
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO User (
    full_name,
    cpf,
    email,
    password_hash,
    address_city,
    address_street,
    address_number,
    address_complement,
    cep,
    notifications_json,
    settings_json
    -- creation_timestamp é DEFAULT CURRENT_TIMESTAMP, não precisamos incluir
) VALUES (
    'Fulano de Tal', -- Nome completo
    '12345678901', -- CPF (apenas números)
    'fulano.detal@example.com', -- Email
    'hashed_password_abc123', -- Hash da senha (nunca armazene senhas em texto puro!)
    'Amparo-SP', -- Cidade e Estado
    'Rua das Flores', -- Nome da rua
    '100', -- Número
    'Apartamento 5B', -- Complemento (pode ser NULL)
    '13900000', -- CEP (apenas números)
    '{"email_enabled": true, "sms_enabled": false}', -- Objeto JSON para notificações
    '{"theme": "dark", "language": "pt-BR"}' -- Objeto JSON para configurações
);

INSERT INTO User (
    full_name,
    cpf,
    email,
    password_hash,
    address_city,
    address_street,
    address_number,
    cep
    -- address_complement é opcional (pode ser NULL), então podemos omitir se não houver
) VALUES (
    'Ciclana da Silva',
    '98765432109',
    'ciclana.silva@example.com',
    'hashed_password_xyz456',
    'Jaguariúna-SP',
    'Avenida Principal',
    '50',
    '13910000'
);
