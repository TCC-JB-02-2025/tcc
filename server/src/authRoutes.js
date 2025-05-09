const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ message: "Auth route" });
  });

  router.post('/', (req, res) => {

  });

  router.get('/:id', (req, res) => {

  });

  return router;
}
