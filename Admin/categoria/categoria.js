

function cadastrarCategoria(dados, callback) {
    $.post('http://localhost:3000/api/categoria/', dados)
        .done(status => { callback(200) })
        .fail((xhr, status, error) => {
            callback(xhr.status);
        })
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
    $.get(`http://localhost:3000/api/categoria`, (dados) => callback(dados));
}
