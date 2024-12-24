const favoritos = document.querySelector('#favoritos-container');

document.addEventListener('DOMContentLoaded', function() {
    carregarFavoritos();
});

function carregarFavoritos(){

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const favoritosContainer = document.querySelector('#favoritos-container');
    favoritosContainer.innerHTML = '';

    if (favoritos.length == 0) {
        favoritosContainer.innerHTML = '<p class="text-left">Ainda não tem nenhum país na lista...</P>';
        return;
    }

    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        method: 'GET',
        success: function(data) {
            favoritos.forEach(nome => {
                const paisEncontrado = data.find(country => country.name.common === nome);

                if (paisEncontrado) {
                    const nome = paisEncontrado.name.common;
                    const regiao = paisEncontrado.region ? paisEncontrado.region : 'erro na região';
                    const imagemUrl = paisEncontrado.flags.svg || 'logo.jpg';

                    const card = getCardPais(imagemUrl, nome, regiao);
                    favoritosContainer.appendChild(card);
                }
            });
        },
        error: function(error) {
            console.error('Erro ao obter dados da API de países:', error);
        }
    });
}

function removerfavorito(nome)
{
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos = favoritos.filter(favorito => favorito !== nome);

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    carregarFavoritos();

    alert("O pais foi removido dos favoritos");
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
                    <button class="btn btn-danger" onclick="removerfavorito('${nome}')">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return divCountry;
}


function verDetalhes(nome) {
    window.location.assign(`detalhes.html?pais=${nome}`);
}
