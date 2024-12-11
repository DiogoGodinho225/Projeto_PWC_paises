const favoritos = document.querySelector('#favoritos-container');

document.addEventListener('DOMContentLoaded', function() {
    carregarFavoritos();
});

function carregarFavoritos(){
    let favoritos = Json.parse(localStorage.getItem('favoritos'));

    favoritosContainer.innerHtml = '';

    if(favoritos.length == 0){
        favoritosContainer.innerHtml = '<p class="text-center">Ainda não tem nenhum país na lista</P>';
        return;
    }

    favoritos.foreach(pais =>{
        const card = getCardPais(pais.imagemUrl, pais.nome, pais.regiao);
        favoritosContainer.appendChild(card);
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
                <div class="botoesDetalhes d-flex justify-content-between mt-2">
                    <button class="btn btn-primary" onclick="verDetalhes('${nome}')">Ver</button>
                </div>
            </div>
        </div>
    `;
    return divCountry;
}

function verDetalhes(nome) {
    window.location.assign(`detalhes.html?pais=${nome}`);
}
