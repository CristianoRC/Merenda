const express = require('express');
var cors = require('cors');

const api = express();
api.use(cors());

// ======================= Importação dos controllers =======================//

require('./Controllers/exemplo')(api);

require('./Controllers/alimento')(api);
// =========================================================================//

const porta = 3000;
api.listen(porta, () => {
    console.log(`Api está rodando na porta ${porta}`);
})