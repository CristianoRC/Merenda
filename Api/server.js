const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// ======================= Importação dos controllers =======================//

require('./Controllers/exemplo')(api);
require('./Controllers/alimento')(api);
require('./Controllers/categoria')(api);
require('./Controllers/merenda')(api);

// =========================================================================//

const porta = 3000;
api.listen(porta, () => {
    console.log(`Api está rodando na porta ${porta}`);
})