const express = require('express');
const router = express.Router();
const bancoDeDados = require('../bancoDeDados');

router.get('/olamundo', (request, response) => {
    if (bancoDeDados.conexao.state != 'authenticated')
        bancoDeDados.conexao.connect();

    bancoDeDados.conexao.query('select * from MensagensDeTeste', (erro, resultado) => {
        if (!erro) {
            response.json({ Mensagens: resultado });
        }
        else {
            response.json({ Erros: erro });
        }
    });
});

router.post('/olaMundo', (request, response) => {
    if (request.body) {
        if (bancoDeDados.conexao.state != 'authenticated')
            bancoDeDados.conexao.connect();

        bancoDeDados.conexao.query(`insert into MensagensDeTeste (texto) values('${request.body.mensagem}')`,
            (erro, sucesso) => {
                if (!erro) {
                    response.status(200);
                    response.send();
                }
                else {
                    response.status(400);
                    response.send(`Erro ao inserir no banco: ${erro}`);
                }
            })
    }
    else {
        response.status(400);
        response.send('Insira uma mensagem!');
    }

});

module.exports = (api) => api.use('/api/teste', router);