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

    // Se ela estiver em FALSE, a categoria não foi excluida, se estiver em TRUE, a categoria foi 'excluida' 
    bancoDeDados.conexao.query(`select Id from Categoria where Flag = false`, (erro, resultado) => {
        if (erro){
            response.status(404).json({ erro: erro }).send('O id não foi incontrado');
            console.log({ erro: erro });
        }
        else if (!erro)
            bancoDeDados.conexao.query(`update Categoria set Flag = true where Id = ${request.params.id}`, (deletado, result) => {
                if (!deletado)
                    response.status(200).send('Deletado com sucesso');

                else{
                    response.status(400).json({ deletado: deletado });
                     console.log({ deletado: deletado });
                }
            });

    });
});


module.exports = (api) => api.use('/api/categoria', router);