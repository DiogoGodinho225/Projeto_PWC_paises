const apiUrl = 'https://restcountries.com/v3.1/all';
const content_paises = document.querySelector('#countries-container');

getCountries();
function getCountries() {
    $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(data) {
            listarPais(data);
        },
        error: function(error) {
            console.error('Erro ao obter dados da API de países:', error);
        }
    });
}

function listarPais(data) {
    data.forEach(country => {
        const nome = country.name.common || 'erro no nome';
        const regiao = country.region ? country.region : 'erro na região';
        const imagemUrl = country.flags.svg || 'logo.jpg';
        content_paises.appendChild(getCardPais(imagemUrl, nome, regiao));
    });
}

function getCardPais(imagemUrl, nome, regiao) {
    const divCountry = document.createElement('div');
    divCountry.classList.add('col');
    divCountry.innerHTML = `
        <div class="Pais">
            <img src="${imagemUrl}" class="card-img-top" alt="${nome}">
            <div class="Pais-body">
                <h5 class="Pais-title">${nome}</h5>
                <small class="text-body-secondary">Região: ${regiao}</small>
                <div class="botoesDetalhes">
                    <button class="btn btn-primary float-end" onclick="verDetalhes('${nome}')">Ver</button>
                    <button class="btn btn-danger" onclick="adicionarAosFavoritos('${nome}')">
                        <i class="fa fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return divCountry;
}

function verDetalhes(nome) {
    console.log(nome);
    window.location.assign(`detalhes.html?pais=${nome}`);
}

function adicionarAosFavoritos(nome) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const paisExistente = favoritos.find(pais => pais === nome);

    if (paisExistente) {
        favoritos = favoritos.filter(pais => pais !== nome);
    } else {
        favoritos.push(nome);
    }

    console.log(favoritos);

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

getCountries();