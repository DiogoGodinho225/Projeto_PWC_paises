const apiUrl = 'https://restcountries.com/v3.1/name';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');

    carregarDetalhes(countryName);
});

function carregarDetalhes(countryName) {
    $.ajax({
        url: `${apiUrl}/${countryName}`,
        method: 'GET',
        success: function(data) {
            console.log(data);
            jsonToHtml(data[0]);
        },
        error: function(error) {
            window.alert("Ups, não existem detalhes para o país que você selecionou.");
            console.log(countryName)
            console.error('Erro ao obter detalhes do país:', error);
        }
    });
}

function jsonToHtml(data) {
    const countryName = document.getElementById("countryName");
    const countryFlag = document.getElementById("countryFlag");
    const countryRegion = document.getElementById("countryRegion");
    const countryLanguages = document.getElementById("countryLanguages");
    const countryCurrencies = document.getElementById("countryCurrencies");
    const countryPopulation = document.getElementById("countryPopulation");

    countryName.textContent = "Detalhes de " + data.name.common;
    countryFlag.src = data.flags.svg || 'sem-bandeira.png';
    countryRegion.textContent = `Região: ${data.region}`;
    countryLanguages.textContent = `Línguas: ${Object.values(data.languages).join(', ')}`;
    countryCurrencies.textContent = `Moeda: ${Object.values(data.currencies).map(curr => curr.name).join(', ')}`;
    countryPopulation.textContent = `População: ${data.population.toLocaleString()}`;

    getTable(data);
}

function getTable(data) {
    const tbody = document.querySelector('tbody');

    const propriedades = [
        { chave: 'Nome Oficial', valor: data.name.official },
        { chave: 'Subregião', valor: data.subregion },
        { chave: 'Capital', valor: data.capital ? data.capital[0] : 'Não disponível' },
        { chave: 'Área (km²)', valor: data.area },
        { chave: 'População', valor: data.population.toLocaleString() },
        { chave: 'Bandeira', valor: `<img src="${data.flags.svg}" alt="Bandeira" width="50">` },
    ];

    propriedades.forEach(({ chave, valor }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${chave}</td><td>${valor}</td>`;
        tbody.appendChild(tr);
    });
}

