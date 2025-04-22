fetch('https://rickandmortyapi.com/api/character', {
    method: 'GET'
})
.then((response) => response.json()) 
.then((json) => {

    var containerDiv = document.querySelector('.container');

    json.results.map((results) => {
        containerDiv.innerHTML +=
            `<div><img src="${results.image}"></div><br>
            <strong>`+ results.name +`</strong><br>
            <span>`+ results.species +`</span><br>
            <i>`+ results.status +`</i>
            <hr>`;
    });
});
