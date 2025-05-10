const crypto = require('crypto');

function exampleFunction(){
    return 2 + 2
}

function validateCPF(cpf) {
    // Verifica se o CPF contém apenas números
    if (!/^\d+$/.test(cpf)) {
        return false;
    }

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os os digitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Verifica o primeiro dígito verificador
    let sum = 0;
    let remainder;


    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Verifica o segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

function generateToken64() {
  try {
    const crypto = require('crypto');

    // Para um token hex de 64 caracteres, precisamos de 32 bytes (64 / 2)
    const numBytes = 32;

    // Gera 32 bytes aleatórios criptograficamente seguros
    const randomBytes = crypto.randomBytes(numBytes);

    // Converte os bytes para uma string hexadecimal
    const token = randomBytes.toString('hex');

    // O resultado será exatamente 64 caracteres hex (32 bytes * 2 chars/byte)
    return token;

  } catch (e) {
    console.error("Erro ao gerar token seguro de 64 caracteres:", e);
    console.error("O módulo 'crypto' é necessário e está embutido no Node.js.");
    throw new Error("Falha ao gerar token: Módulo crypto não disponível ou erro.");
  }
}

function extractToken(req, res, next) {
    const authHeader = req.get('Authorization');

    // Verifica se o cabeçalho Authorization existe
    if (!authHeader) {
        // Se não houver cabeçalho, retorna um erro 401 para rotas que exigem autenticação
        // Ou chama next() se o middleware for usado globalmente e algumas rotas não precisarem
        // Para a rota de logout, a falta do token é um erro.
        return res.status(401).json({ message: 'Cabeçalho Authorization não fornecido.' });
    }

    // O cabeçalho deve estar no formato "Bearer TOKEN"
    const parts = authHeader.split(' ');

    // Verifica se o formato é "Bearer TOKEN"
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        // Se o formato for inválido, retorna um erro 401
        return res.status(401).json({ message: 'Formato do token inválido. Use: Bearer <token>' });
    }

    // Extrai o token (a segunda parte após "Bearer")
    const token = parts[1];

    // Armazena o token no objeto req para uso posterior
    req.token = token;

    // Continua para o próximo middleware ou handler da rota
    next();
}


module.exports = {
    exampleFunction,
    validateCPF,
    generateToken64,
    extractToken,
    // Add other helper functions here
};













