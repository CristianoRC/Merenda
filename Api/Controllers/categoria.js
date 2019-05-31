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

// DELETA AS CATEGORIAS INFORMADAS

router.delete('/:id', (request, response) => {

    // Se Deletado estiver em FALSE, a categoria não foi excluida, se estiver em TRUE, a categoria foi 'excluida' 
    bancoDeDados.conexao.query(`select * from Categoria where Deletado = false and Id = ${request.params.id}`, (erro, resultado) => {
        if (resultado.length > 0)
            response.status(200).send('O id foi encontrado e Deletado com sucesso!');
        else
            response.status(404).json({ resultado : 'O id não foi encontrado!' });
        if (!erro)
            bancoDeDados.conexao.query(`update Categoria set Deletado = true where Id = ${request.params.id}`, (deletado, result) => {
                if (!deletado)
                    response.status(200).send();

                else
                    response.status(400).json({ deletado: deletado });


            });

    });
});


module.exports = (api) => api.use('/api/categoria', router);