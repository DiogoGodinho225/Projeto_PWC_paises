const apiUrl = 'https://restcountries.com/v3.1/name';

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const nomePais = params.get('pais');

    carregarDetalhes(nomePais);
});

function carregarDetalhes(nomePais) {
    $.ajax({
        url: `${apiUrl}/${nomePais}`,
        method: 'GET',
        success: function(data) {
            console.log(data);
            Listar(data[0]);
        },
        error: function(error) {
            window.alert("Não existem detalhes para o país que você selecionou.");
            console.log()
            console.error('Erro ao obter detalhes do país:', error);
        }
    });
}

function Listar(data) {
    const PaisNome = document.getElementById("PaisNome");
    const PaisBandeira = document.getElementById("PaisBandeira");


    PaisNome.textContent = "Detalhes de " + data.name.common;
    PaisBandeira.src = data.flags.svg || 'sem-bandeira.png';

    getTabela(data);
}

function getTabela(data) {
    const tbody = document.querySelector('tbody');

    const propriedades = [
        { chave: 'Nome Oficial', valor: data.name.official },
        { chave: 'Região', valor: data.region},
        { chave: 'Subregião', valor: data.subregion || 'Sem subregião'},
        { chave: 'Capital', valor: data.capital ? data.capital[0] : 'Não disponível' },
        { chave: 'Línguas', valor: Object.values(data.languages).join(', ') },
        { chave: 'Moeda', valor: Object.values(data.currencies).map(curr => curr.name).join(', ') },
        { chave: 'Área (km²)', valor: data.area },
        { chave: 'População', valor: data.population.toLocaleString('pt')},
    ];

    propriedades.forEach(({ chave, valor }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><strong>${chave}</strong></td><td>${valor}</td>`;
        tbody.appendChild(tr);
        });
    }

