const express = require('express');
const router = express.Router();


   const bancoDeDados =  require('./bancoDeDados');

    router.get('/', (request, response) => {
        response.send('Alimento aqui');

      if (bancoDeDados.conexao.state != 'autenticated') 
            bancoDeDados.conexao.connect();

            bancoDeDados.conexao.query('select * from MensagensDeTeste', (erro, resultado) => {
                if(!erro) {
                    response.json({ Mensagens: resultado});
                } else {
                    response.json({ Erros: erro});
                }

            });

    router.post('/', (request, response) => { 
        if(request.body) {    
            if (bancoDeDados.conexao.state != 'authenticated')
                bancoDeDados.conexao.connect();
                
                bancoDeDados.conexao.query(`inset into Alimento (Nome, Descrição, Categoria) values('${request.body.mensagen}')`,
                (erro, sucesso) => {
                    if(!erro) {
                        response.status(200);
                        response.send();
                    } else {
                        response.status(400);
                        response.send('Erro ao fazer o cadadastro: ${erro}');
                    }
                }
    
            })
        }
    });

    


    module.exports = (api) => api.use('/api/alimento', router);