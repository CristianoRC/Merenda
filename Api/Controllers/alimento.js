const express = require('express');
const router = express.Router();

const app = express();
    app.set('view engine' , 'ejs');
    router.get('/alimento', (require, response) => {
        response.render('C:/Users/wkdoz/OneDrive/Documentos/GitHub/Merenda/Api/views/index.ejs');
    });

    


    module.exports = (api) => api.use('/api/teste', router);