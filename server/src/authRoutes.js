const express = require('express');
const { validateCPF } = require("./helpers");

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ message: "Auth route" });
  });

  router.post('/register', (req, res) => {
    const { full_name, cpf, email, password, address_street, address_number, address_complement, address_city, cep } = req.body;
    const user = {
      full_name,
      cpf,
      email,
      password,
      address_street,
      address_number,
      address_complement,
      address_city,
      cep
    };
    // Adiciona o hash da senha
    user.password_hash = user.password;
  
    user.password = undefined;

    // Passa por cada uma das chaves obrigatorias e verifica se existe
    const requiredFields = ['full_name', 'cpf', 'email', 'password_hash', 'address_street', 'address_number', 'address_city', 'cep'];

    for (const field of requiredFields) {
      if (!user[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}`, request: req.body });
      }
    }

    // Verifica se o CPF é do tamanho certo e se é valido (usando a formula do CPF)
    if (!validateCPF(user.cpf)) {
      //return res.status(400).json({ error: 'Invalid CPF' });
    }

    pool.query('INSERT INTO Users SET ?', user, (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Error inserting user' });
      }
      res.json({ 
        message: "User registered successfully", 
        user_id: results.insertId, 
        user: user 
      });
    });


  });

  router.get('/:id', (req, res) => {

  });

  return router;
}
