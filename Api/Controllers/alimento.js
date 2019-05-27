const express = require('express');
const router = express.Router();


    router.get('/alimento', (require, response) => {
        response.send('Aqui são os alimentos...');
    });

    


    module.exports = (api) => api.use('/api/teste', router);