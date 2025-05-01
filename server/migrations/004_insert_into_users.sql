-- Down
-- Deleta todos os usuários da tabela User
DELETE FROM Users;

-- Up
INSERT INTO Users (
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

INSERT INTO Users (
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
