const express = require('express');
const router = express.Router();
const bancoDeDados = require('./bancoDeDados');

router.get('/', (request, response) => {

    bancoDeDados.conexao.query('select * from Categoria', (erro, resultado) => {
        if (!erro) {
            response.status(200).json(resultado);
        }
        else {
            response.status(400).json({ erro: erro });
        }

        response.send();

    });
});

module.exports = (api) => api.use('/api/categoria', router);