-- Down
DROP TABLE IF EXISTS TokensLogin; -- Add semicolon here!

-- Up
CREATE TABLE TokensLogin (
    token_id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para cada token
    user_id INT NOT NULL, -- ID do usuário associado ao token
    token VARCHAR(255) NOT NULL, -- O token gerado para autenticação
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora de criação do token
    expiration_timestamp TIMESTAMP NOT NULL, -- Data e hora de expiração do token

    -- Chave estrangeira referenciando a tabela Users
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,

    -- Índice para buscas mais rápidas
    INDEX idx_user_id (user_id)
);

--  Cria tokens para os usuarios de exemplo
INSERT INTO TokensLogin (user_id, token, expiration_timestamp) VALUES
(1, 'token_abc123', DATE_ADD(NOW(), INTERVAL 1 HOUR)), -- Token para o usuário 1 com expiração em 1 hora
(2, 'token_xyz456', DATE_ADD(NOW(), INTERVAL 2 HOUR)); -- Token para o usuário 2 com expiração em 2 horas