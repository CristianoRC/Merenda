const express = require('express');
const api = express();


// ======================= Importação dos controllers =======================//

    require('./Controllers/exemplo')(api);

// =========================================================================//

const porta = 3000;
api.listen(porta, () => {
    console.log(`Api está rodando na porta ${porta}`);
})