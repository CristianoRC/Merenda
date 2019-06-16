function cadastrarCategoria(nome, descricao) {
    alert("Fazer a comunicação com api quando o endpoint estiver pronto!");
}

function deletarCategoria(id, callback) {
    $.ajax({
        url: `http://localhost:3000/api/categoria/${id}`,
        type: 'DELETE',
        success: function (result) {
            if (result == "O id foi encontrado e Deletado com sucesso!") {
                callback();
                M.toast({ html: 'Categoria deletada com sucesso!' });
            }
            else {
                M.toast({ html: 'Não foi possível deletar a categoria!' });
            }
        }
    });

    callback();
}

function obterTodasCategorias(callback) {
    $.get(`${apiUrl}/categoria`, (dados) => callback(dados));
}
