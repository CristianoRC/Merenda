const mysql = require('mysql');

let conexao = mysql.createConnection(
    {
        host: 'mysql465.umbler.com',
        port: '41890',
        database: 'merenda',
        user: 'merenda',
        password: 'merenda2019',
        charset: 'utf8'
    });

module.exports = {
    conexao: conexao
}
