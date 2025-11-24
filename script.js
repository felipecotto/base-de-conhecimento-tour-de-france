let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function iniciarBusca() {
    if (dados.length === 0) {
        try  
            {
                let resposta = await fetch("data.json");
                dados = await resposta.json();
            } catch(error) {
                console.error("Falha ao buscar dados:", error);
                return; 
            }
        }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => 
        dado.ano.toString().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; 
    if (dados.length === 0) {
        cardContainer.innerHTML = `<p class="no-results">Ainda não temos esse registro em nossa base</p>`;
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.ciclista}</h2>
            <p>${dado.equipe}</p>
            <p>${dado.ano}</p>
            <p>Bicicleta ${dado.marca} ${dado.modelo}</p>
        `
        cardContainer.appendChild(article);
    }
}