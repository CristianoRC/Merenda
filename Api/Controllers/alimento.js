const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

router.get('/', (request, response) => {
    if (bancoDeDados.conexao.state != 'authenticated')
        bancoDeDados.conexao.connect();

    bancoDeDados.conexao.query('select (texto) from MensagensDeTeste where id = 4', (erro, resultado) => {
        if (!erro) {
            response.json({ Mensagens: resultado });
        }
        else {
            response.json({ Erros: erro });
        }
    });
});

router.post('/', (request, response) => {
    if (request.body) {
        if (bancoDeDados.conexao.state != 'authenticated')
            bancoDeDados.conexao.connect();

        bancoDeDados.conexao.query(`insert into Alimento (Nome, Descrição, Categoria) values('${request.body.mensagem}')`,
            (erro, sucesso) => {
                if (!erro) {
                    response.status(200);
                    response.send();
                }
                else {
                    response.status(400);
                    response.send(`Erro ao cadastrar no banco: ${erro}`);
                }
            })
    }
    else {
        response.status(400);
        response.send('Insira uma mensagem!');
    }

});

module.exports = (api) => api.use('/api/alimento', router);
