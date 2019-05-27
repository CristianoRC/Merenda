const express = require('express');
const router = express.Router();

router.get('/alimento', (request, response) => {
    response.json({mensagem: 'Alimentos'})
});



module.exports = (api) => api.use('/api/teste', router);