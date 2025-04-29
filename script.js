const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

characterId.addEventListener('keydown', function (event) {
  const invalidKeys = ['e', 'E', '+', '-', ','];

  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
    alert('❌ Apenas números inteiros positivos são permitidos!');
  }
});


const fetchApi = (value) => {
  return fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
};

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
    .map((elem) => {
      if (elem.checked === true && Array.isArray(result[elem.name])) {
        const arrayResult = result[elem.name].join('\r\n');
        const newElem = document.createElement('p');
        newElem.innerHTML = `📺 ${newKeys[elem.name]}: ${arrayResult}`;
        content.appendChild(newElem);
      } else if (elem.checked === true && elem.name === 'origin') {
        const newElem = document.createElement('p');
        newElem.innerHTML = `🪐 ${newKeys[elem.name]}: ${result[elem.name].name}`;
        content.appendChild(newElem);
      } else if (elem.checked === true && typeof result[elem.name] !== 'object') {
        const newElem = document.createElement('p');
        newElem.innerHTML = `🧾 ${newKeys[elem.name]}: ${result[elem.name]}`;
        content.appendChild(newElem);
      }
    });
};

btnGo.addEventListener('click', async (event) => {
  event.preventDefault();

  const id = characterId.value.trim();

  if (id === '') {
    return alert('🚨 Por favor, insira um ID!');
  }

  if (isNaN(id) || Number(id) <= 0) {
    return alert('🚫 O ID deve ser um número positivo! Nada de letras ou números negativos. 🙃');
  }

  const result = await fetchApi(id);

  content.innerHTML = '';
  conteinerResult.className = 'result-style';
  image.src = `${result.image}`;
  buildResult(result);
});

btnReset.addEventListener('click', () => location.reload());
