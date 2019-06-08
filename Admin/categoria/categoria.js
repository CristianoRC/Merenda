function cadastrarCategoria(nome, descricao) {
    alert("Fazer a comunicação com api quando o enpoint estiver pronto!");
}

function obterTodasCategorias(callback) {
    $.get(`${apiUrl}/categoria`, (dados) => callback(dados));
}
