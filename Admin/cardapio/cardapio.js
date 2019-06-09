const apiUrl = 'http://localhost:3000/api'


function obterTodasCategorias(callback) {
    $.get(`${apiUrl}/categoria`, (dados) => callback(dados));
}
function cadastrarAlimento(dados, callback) {
    $.post(`${apiUrl}/alimento/`, dados, (resultado, status) => {
        callback(status);
    }), "json"
}


var corpo_tabela = document.querySelector('tbody');

var diasDaSemana = ({
    Segunda: '',
    Terca: '',
    Quarta: '',
    Quinta: '',
    Sexta: ''
});
var contador = 0;


function cadastrar(diasDaSemana) {

    this.Segunda = document.querySelector('#segunda').value;
    this.Terca = document.querySelector('#terca').value;
    this.Quarta = document.querySelector('#quarta').value;
    this.Quinta = document.querySelector('#quinta').value;
    this.Sexta = document.querySelector('#sexta').value;

    while (contador < 1) {
        var linha = document.createElement('tr');
        var campoSegunda = document.createElement('td');
        var campoTerca = document.createElement('td');
        var campoQuarta = document.createElement('td');
        var campoQuinta = document.createElement('td');
        var campoSexta = document.createElement('td');
        // Cria o texto 
        var textoSegunda = document.createTextNode(this.Segunda);
        var textoTerca = document.createTextNode(this.Terca);
        var textoQuarta = document.createTextNode(this.Quarta);
        var textoQuinta = document.createTextNode(this.Quinta);
        var textoSexta = document.createTextNode(this.Sexta);
        // Vincula o nós
        campoSegunda.appendChild(textoSegunda);
        campoTerca.appendChild(textoTerca);
        campoQuarta.appendChild(textoQuarta);
        campoQuinta.appendChild(textoQuinta);
        campoSexta.appendChild(textoSexta);
        // 
        linha.appendChild(campoSegunda);
        linha.appendChild(campoTerca);
        linha.appendChild(campoQuarta);
        linha.appendChild(campoQuinta);
        linha.appendChild(campoSexta);
        //
        corpo_tabela.appendChild(linha);
        // contador NÃO ACREDITO QUE DEU CERTO
        contador++;

    }






}


