/*
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
    notifications_json JSON DEFAULT '{}',
    settings_json JSON DEFAULT '{}',
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
const express = require('express');
const { validateCPF } = require("./helpers")

module.exports = (pool) => {
  const router = express.Router();

  // Define routes specific to users
  router.get('/', (req, res) => {
    pool.query('SELECT * FROM Users', (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Error fetching users' });
      }
      res.json(results);
    });
  });

  // router.post('/', (req, res) => {
  //   const { full_name, cpf, email, password_hash, address_street, address_number, address_complement, address_city, cep } = req.body;
  //   const user = {
  //     full_name,
  //     cpf,
  //     email,
  //     password_hash,
  //     address_street,
  //     address_number,
  //     address_complement,
  //     address_city,
  //     cep
  //   };

  //   // Passa por cada uma das chaves obrigatorias e verifica se existe
  //   const requiredFields = ['full_name', 'cpf', 'email', 'password_hash', 'address_street', 'address_number', 'address_city', 'cep'];

  //   for (const field of requiredFields) {
  //     if (!user[field]) {
  //       return res.status(400).json({ error: `Missing required field: ${field}`, request: req.body });
  //     }
  //   }

  //   // Verifica se o CPF é do tamanho certo e se é valido (usando a formula do CPF)
  //   if (!validateCPF(user.cpf)) {
  //     //return res.status(400).json({ error: 'Invalid CPF' });
  //   }
    
  //   pool.query('INSERT INTO Users SET ?', user, (error, results) => {
  //     if (error) {
  //       // Obtem codigo de erro
  //       const errorCode = error.code;
  //       if (errorCode === 'ER_DUP_ENTRY') {
  //         // Verifica qual campo causou o erro
  //         const field = error.sqlMessage.match(/Duplicate entry '.*' for key '(.*)'/)[1];
  //         return res.status(409).json({ error: `Duplicate entry for field: ${field}` , request: req.body });
  //       }
  //     }
  //     return res.status(201).json({ id: results.insertId, ...user });
  //   });
  // });

  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM Users WHERE id = ?', [userId], (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Error fetching user' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(results[0]);
    });
  });

  return router;
}
