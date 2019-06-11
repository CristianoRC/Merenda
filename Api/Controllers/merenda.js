const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

router.post('/', (request, response) => {
    if (request.body.data && request.body.observacoes && request.body.alimento) {
        let sql = "SELECT nome FROM Alimento WHERE id in(";
        for (let alimentos of request.body.alimento) {
            sql = sql + `${alimentos},`
        }
        sql = sql.substr(0, (sql.length - 1));
        sql = sql + ')';
        bancoDeDados.conexao.query(sql, (erro, resultado) => {
            if (resultado.length > 2) {
                bancoDeDados.conexao.query(`insert into Cardapio (Data, Observacoes)
                    values('${request.body.data}', '${request.body.observacoes}')`, (erro, resultado) => {
                        if (!erro)
                            response.status(200);
                        else
                            response.status(400).json({ erro: erro });
                    });
                let sql = "insert into Cardapio_Alimento (Data, IdAlimento) values";
                for (let alimentos of request.body.alimento) {
                    sql = sql + `('${request.body.data}', ${alimentos}),`
                }
                sql = sql.substr(0, (sql.length - 1));
                bancoDeDados.conexao.query(sql, (erro, resultado) => {
                    if (!erro)
                        response.status(200).json({ resultado: 'Dados inseridos com sucesso!' });
                    else
                        response.status(400).json({ erro: erro });
                })
            }
            else
                response.status(400).json({ erro: 'Um ou mais ID(s) inseridos não existem na tabela Alimento!' });
        });
    }
    else
        response.status(400).json({ erro: 'Preencha todos campos!' });
});




module.exports = (api) => api.use('/api/merenda', router);