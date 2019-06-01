const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');



router.post('/', (request, response) => {
    if (request.body.data && request.body.observacao) {
        bancoDeDados.conexao.query(`insert into Cardapio (Data, Observacoes) 
        values('${request.body.data}', '${request.body.observacao}')`,
            (erro, resultado) => {
                if (!erro)
                    response.status(200).json({ resultado: 'Cardapio foi cadastrado com sucesso' }).send();
                else if (erro)
                    response.status(400).json({ erro: erro });
                if (request.body.idAlimento) {
                    bancoDeDados.conexao.query(`insert into Cardapio_Alimento (Data, IdAlimento)
                    values('${request.body.data}',  '${request.body.idAlimento}')`,
                        (error, result) => {
                            if (error)
                                response.status(400).json({ error: error });
                            else if (!error)
                                response.status(200).send('Cardapio foi cadastro com sucesso"');

                        });
                }
                else
                    response.status(400).send('Campo envalido');
            });
    }

});


// ATUALIZA OS DADOS DO CARDAPIO

router.put('/:data', (request, response) => {

    if (request.body.data && request.body.observacao) {
        bancoDeDados.conexao.query(`update Cardapio set Data = '${request.body.data}', 
         Observacoes = '${request.body.observacao}'
         where Data = '${request.params.data}'`, (erro, resposta) => {
                if (erro)
                    response.status(400).json({ erro: erro });
                else if (!erro)
                    if (request.body.idAlimento) {
                        bancoDeDados.conexao.query(`update Cardapio_Alimento set Data = '${request.body.data}', 
                        IdAlimento = '${request.body.idAlimento}'`, (error, result) => {
                                if (error)
                                    response.status(400).json({ Erro: error });
                                else
                                    response.status(200).send('Foram inseridos com sucesso');

                            });
                    }
            });
    }
    else
        response.status(400).send('Campos invalidos!');
});

// RETORNA A MERENDA DA SEMANA
/*
/api/merenda/{data} : GET - retorna a merenda da data informada

200 (OK) detalhes da data informada.
*/

router.get('/:data', (request, response) => {
    bancoDeDados.conexao.query(`select c.Observacoes, a.IdAlimento 
    from Cardapio as c, Cardapio_Alimento as a
    WHERE c.Data = '${request.params.data}'`,
        (erro, resultado) => {
            if (resultado.length > 0)
                response.status(200).json({ Resposta: resposta });
            else
                response.status(400).json({ Erro: erro });
            if(erro)
                response.status(400).json({ Error: erro });
        });
});
module.exports = (api) => api.use('/api/merenda', router);