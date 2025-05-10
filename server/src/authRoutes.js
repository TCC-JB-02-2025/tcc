const express = require('express');
const { validateCPF, generateToken64, extractToken } = require("./helpers");

// Importa o bcrypt para fazer o hash da senha
const bcrypt = require('bcrypt');
const saltRounds = 10; // quantos calculos de hash serão feitos
const bcryptSalt = bcrypt.genSaltSync(saltRounds);

// Constantes
const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ message: "Auth route" });
  });

  router.post('/register', (req, res) => {
    const requiredFields = ['full_name', 'cpf', 'email', 'password_hash', 'address_street', 'address_number', 'address_city', 'cep'];
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
    user.password_hash = bcrypt.hashSync(user.password, bcryptSalt);

    // Apaga a senha do objeto antes de enviar para o banco de dados
    // Isso é importante para não enviar a senha em texto claro pro DB
    delete user.password; // não pode usar password=undifined, pq se não da erro

    // Passa por cada uma das chaves obrigatorias e verifica se existe
    

    for (const field of requiredFields) {
      if (!user[field]) { // se não existe da erro
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
        // TODO: implementar tratamento de erro mais especifico
      }

      // Cria um token para o usuario e coloca no BD
      const token = generateToken64();
      const user_id = results.insertId;
      const expiration_timestamp = new Date(Date.now() + TOKEN_EXPIRATION_TIME); // 1 hora
      pool.query('INSERT INTO TokensLogin (user_id, token, expiration_timestamp) VALUES (?, ?, ?)', [user_id, token, expiration_timestamp], (error, results) => {
        if (error) {
          console.error('Error inserting token:', error);
          return res.status(500).json({ error: 'Error inserting token' });
        }
      });

      res.json({ 
        message: "User registered successfully", 
        token: token,
        user_id: results.insertId, 
        user: user 
      });
    });


  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Adiciona o hash da senha
    const password_hash = bcrypt.hashSync(password, bcryptSalt);

    const requiredFields = ['email', 'password_hash'];
    const user = {
      email,
      password_hash
    };

    // Verifica os campos obrigatorios
    for (const field of requiredFields) {
      if (!user[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}`, request: req.body });
      }
    }

    pool.query('SELECT * FROM Users WHERE email = ?', [user.email], (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Error fetching user' });
      };
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const user = results[0];

      // Verifica se a senha está correta
      // O bcrypt.compareSync compara a senha em texto claro com o hash, é essencial pois
      // o hash é gerado de forma diferente a cada vez
      if (!bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Cria um token para o usuario e coloca no BD
      const token = generateToken64();
      const user_id = user.user_id;
      const expiration_timestamp = new Date(Date.now() + TOKEN_EXPIRATION_TIME); 
      pool.query('INSERT INTO TokensLogin (user_id, token, expiration_timestamp) VALUES (?, ?, ?)', [user_id, token, expiration_timestamp], (error, results) => {
        if (error) {
          console.error('Error inserting token:', error);
          return res.status(500).json({ error: 'Error inserting token' });
        }
        res.json({ 
          message: "User logged in successfully", 
          token: token,
          user_id: user.user_id, 
          user: user 
        });
      });
    });
  });

  router.post('/logout', extractToken, (req, res) => {
    const token = req.token

    if (!token){
      return res.status(401).json({ error: 'Token not provided' });
    }

    pool.query('DELETE FROM TokensLogin WHERE token = ?', [token], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error deleting token' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Token not found' });
      }
      res.json({ message: 'User logged out successfully' });
    });
  });
  
  router.get('/:id', (req, res) => {

  });

  return router;
}
