const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

router.get('/:Id', (request, response) => {
    const id = request.params.Id;
    bancoDeDados.conexao.query(`select * from Alimento WHERE Id=${id}`, (erro, resultado) => {
        if (resultado.length === 0)
            response.status(404).json({ erro: 'O id informado não foi encontrado' });
        else if (!erro)
            response.status(200).json(resultado);
        else
            response.status(400).json({ erro: erro });
    });
});

router.delete('/:Id', (request, response) => {
    const id = request.params.Id;
    bancoDeDados.conexao.query(`delete from Alimento WHERE Id=${id}`, (erro, resultado) => {
        if (resultado.affectedRows === 0)
            response.status(404).json({ erro: 'O id informado não foi encontrado' });
        else if (!erro)
            response.status(200).json('Deletado com sucesso!');
        else
            response.status(400).json({ erro: erro });
    });
});

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

// Cadastra um novo Alimento 
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

// Atualiza os dados do Alimento
router.put('/:id', (request, response) => {
    bancoDeDados.conexao.query(`select * from Alimento where Id = ${request.params.id}`,
        (erro, resultado) => {
            if (resultado.length === 0)
                response.status(404).send();
            if (!erro)
                bancoDeDados.conexao.query(`update Alimento set Nome = '${request.body.nome}', 
                Descricao = '${request.body.descricao}', Categoria = '${request.body.categoria}' where Id = ${request.params.id}`, (erro, resultado) => {
                        if (erro) {
                            response.status(400).json({ erro: erro }).send();
                        } else
                            response.status(200).send();
                    });
            else
                response.status(400).json({ Erro: erro }).send();
        });
});

module.exports = (api) => api.use('/api/alimento', router);