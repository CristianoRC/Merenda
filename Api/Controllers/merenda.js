const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');



// CADASTRA OS DADOS NOS CARDAPIOS
router.post('/', (request, response) => {
    if (request.body.data && request.body.observacao && request.body.alimentos) {

        let data = request.body.data;
        bancoDeDados.conexao.query(`insert into Cardapio (Data, Observacoes) 
        values('${data}', '${request.body.observacao}')`,
            (erro, resultado) => {
                let sql = "insert into Cardapio_Alimento (Data, IdAlimento) values ";
                if (erro)
                    response.status(400).json({ erro: erro });
                for (let alimento of request.body.alimentos) {
                    sql += `('${data}', ${alimento}),`

                }
                sql = sql.substr(0, (sql.length - 1));
                bancoDeDados.conexao.query(sql, (error, result) => {
                    if (resultado.affectedRows > 0 && result.affectedRows > 0)
                        response.status(200).json({ Resultado: resultado, Result: result });
                    else
                        response.status(400).json({ Error: error }).send();
                });



            });
    }
    else
        response.status(404).send();


});


// ATUALIZA OS DADOS DO CARDAPIOS

router.put('/:data', (request, response) => {


    if (request.body.observacao) {
        bancoDeDados.conexao.query(`update Cardapio set Observacoes = '${request.body.observacao}'
         where Data = '${request.params.data}'`, (erro, resultado) => {
                let mysql = "insert into Cardapio_Alimento (Data, IdAlimento) values ";
                data = request.params.data;
                if (erro)
                    response.status(400).json({ erro: erro });
                else
                    bancoDeDados.conexao.query(`Delete from Cardapio_Alimento where Data = '${request.params.data}'`, (error, result) => {
                        if (!error)
                           
                        for (let novosalimentos of request.body.novosalimentos) {
                            mysql += `('${data}', ${novosalimentos}),`
                        }
                        mysql = mysql.substr(0, (mysql.length - 1));
                        bancoDeDados.conexao.query(mysql, (errinho, resultadinho) => {
                            if (resultadinho.affectedRows > 0 && resultado.affectedRows > 0)
                                response.status(200).json({ Resultado: resultadinho }).send();
                            else
                                response.status(400).json({ Erro: errinho });

                        });



                    });



            });
    }
    else
        response.status(404).send('Campos invalidos!');
});


// RETORNA A MERENDA DA DATA INFORMADA
router.get('/:data', (request, response) => {
    bancoDeDados.conexao.query(`select a.IdAlimento, c.Observacoes 
    from  Cardapio_Alimento as a
    inner join Cardapio as c on a.Data = c.Data
    WHERE a.Data = '${request.params.data}'`,
        (erro, resultado) => {
            if (resultado.length > 0)
                response.status(200).json({ Resultado: resultado });
            else
                response.status(400).json({ Erro: erro });
            if (erro)
                response.status(400).json({ Error: erro });
        });
});




module.exports = (api) => api.use('/api/merenda', router);