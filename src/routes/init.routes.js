// rotas.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rota principal');
});

router.get('/outra-rota', (req, res) => {
  res.send('Outra rota');
});

module.exports = router;
