const apiUrl = 'http://localhost:3000/api'

function cadastrarAlimento(dados, callback) {
    $.post(`${apiUrl}/alimento/`, dados, (resultado, status) => {
        callback(status);
    }), "json"
}