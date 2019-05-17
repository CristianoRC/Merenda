const express = require('express');
const router = express.Router();

router.get('/olamundo', (request, response) => {
    response.json({ mensagem: 'Olá Mundo!' })
});

module.exports = (api) => api.use('/api/teste', router);