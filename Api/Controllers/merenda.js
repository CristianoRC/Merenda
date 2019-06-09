const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

router.post('/', (request, response) => {
    if (request.body.data && request.body.observacoes && request.body.idalimento) {
        bancoDeDados.conexao.query(`select * from Alimento where Id=${request.body.idalimento}`, (erro, resultado) => {
            if (resultado.length > 0) {
                bancoDeDados.conexao.query(`insert into Cardapio (Data, Observacoes)
                    values('${request.body.data}', '${request.body.observacoes}')`, (erro, resultado) => {
                        if (!erro)
                            response.status(200);
                        else
                            response.status(400).json({ erro: erro });
                    });
                bancoDeDados.conexao.query(`insert into Cardapio_Alimento (Data, IdAlimento)
                    values('${request.body.data}', '${request.body.idalimento}')`, (erro, resultado) => {
                        if (!erro)
                            response.status(200).json({ resultado: 'Dados inseridos com sucesso!' });
                        else
                            response.status(400).json({ erro: erro });
                    });

            }
            else
                response.status(400).json({ erro: 'O id do alimendo não existe na tabela de alimentos!' });
        });
    }
    else
        response.status(400).json({ erro: 'Preencha todos campos!' });
});




module.exports = (api) => api.use('/api/merenda', router);