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
            if (resultado.length >= 1) {
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


router.get('/', (request, response) => {

    // July 30, 2019 01:15:00
    let hoje = new Date('July 30, 2019 01:15:00');

    if (hoje.getDay() === 0 || hoje.getDay() === 6) //Domingo ou sábado
        response.status(200).json({ Cardapios: [], Merendas: [] })


    let diasParaSegunda = (hoje.getDay() - 1) * -1;//1 representa o dia segunda-feira
    let diasParaSexta = (hoje.getDay() - 5) * -1;//5 representa o dia sexta feita

    let segundaFeira = new Date('July 30, 2019 01:15:00').adicionarDias(diasParaSegunda);
    let sextaFeira = new Date('July 30, 2019 01:15:00').adicionarDias(diasParaSexta);

    //Busca no Banco
    var sqlCardapio = `select * from Cardapio where Data between '${segundaFeira.formatar()}' and '${sextaFeira.formatar()}'`;
    var sqlMerendas = `select c.Data, a.Id, a.Nome, a.Descricao, x.Titulo as 'Categoria' from Cardapio_Alimento c
                         inner join Alimento a on c.IdAlimento = a.Id 
                         inner join Categoria x on a.Categoria = x.Id
                        where c.Data between '${segundaFeira.formatar()}' and '${sextaFeira.formatar()}'
                        order by c.Data`;

    bancoDeDados.conexao.query(sqlCardapio, (erro, resultado) => {
        if (erro)
            response.status(400).json(erro);
        let cardapios = resultado;

        bancoDeDados.conexao.query(sqlMerendas, (erroCardapio, resultadoMerendas) => {
            if (erroCardapio)
                response.status(400).json(erroCardapio);
            response.status(200).json({ segunda: segundaFeira, sexta: sextaFeira, hoje: hoje, Cardapios: cardapios, Merendas: resultadoMerendas });
        });
    });

});





Date.prototype.formatar = function () {
    var d = new Date(this.valueOf()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


Date.prototype.adicionarDias = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


module.exports = (api) => api.use('/api/merenda', router);