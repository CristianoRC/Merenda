const apiUrl = 'http://localhost:3000/api'

function obterTodasCategorias(callback) {
    $.get(`${apiUrl}/categoria`, (dados) => callback(dados));
}
function cadastrarAlimento(dados, callback) {
    $.post(`${apiUrl}/alimento/`, dados, (resultado, status) => {
        callback(status);
    }), "json"
}
