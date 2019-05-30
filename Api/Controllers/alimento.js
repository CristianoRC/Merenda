const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');



router.post('/', (request, response) => {
    // Se o user preencher os campos vai entrar no IF
    if (request.body.nome && request.body.descricao && request.body.categoria >= 0) {
        bancoDeDados.conexao.query(`insert into Alimento (Nome, Descricao, Categoria) values('${request.body.nome}', '${request.body.descricao}', '${request.body.categoria}')`,
            (erro, resultado) => {
                if (!erro) // Se não tiver erro
                    response.status(200);
                else
                    response.status(400).json({ Erro: erro });
            }

        )
    }
    // Se o user não mandar os campos retorna 400
    else
        response.status(400).json({ Erro: 'Preencha os campos de Nome, Descrição e Categoria!' });
    // Manda a request p/ o user
    response.send();

});

module.exports = (api) => api.use('/api/alimento', router);
