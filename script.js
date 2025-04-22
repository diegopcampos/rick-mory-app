async function carregarPersonagens() {
    const dadosResponse = await fetch('https://rickandmortyapi.com/api/character');
    const dados = await dadosResponse.json();

    const containerDiv = document.querySelector('.container');

    dados.results.map((character) => {
        containerDiv.innerHTML +=
            `<div><img src="${character.image}"></div><br>
             <strong>${character.name}</strong><br>
             <span>${character.species}</span><br>
             <i>${character.status}</i>
             <hr>`;
    });
}

document.addEventListener("DOMContentLoaded", carregarPersonagens);
