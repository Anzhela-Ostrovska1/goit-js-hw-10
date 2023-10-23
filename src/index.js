import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectElement = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');

selectElement.addEventListener('change', showBreedInfo);

loader.style.display = 'block';

const breedMap = {};

fetchBreeds()
  .then(resp => {
    const breeds = resp.data;

    breeds.forEach(breed => {
      const breedOption = document.createElement('option');
      breedOption.textContent = breed.name;
      breedOption.value = breed.id;

      selectElement.appendChild(breedOption);
      loader.style.display = 'none';

      const breedInfo = {
        name: breed.name,
        description: breed.description,
        temperament: breed.temperament,
      };
      breedMap[breed.id] = breedInfo;
    });
  })

  .catch(error => {
    loader.style.display = 'none';
    errorText.style.display = 'block';
    console.log(error);
  });

function showBreedInfo(event) {
  loader.style.display = 'block';
  errorText.style.display = 'none';
  catInfo.innerHTML = '';

  const breedId = event.currentTarget.value;

  const breedInfoPromise = new Promise(resolve => {
    const { name, description, temperament } = breedMap[breedId];
    const markup = createMarkup(name, description, temperament);
    resolve(markup);
  });

  const imagePromise = fetchCatByBreed(breedId).then(resp => {
    const breedImg = document.createElement('img');
    breedImg.src = resp.data[0].url;
    breedImg.alt = 'cat';
    breedImg.width = 400;
    breedImg.style.padding = '20px';
    return breedImg;
  });

  Promise.all([breedInfoPromise, imagePromise])
    .then(([markup, breedImg]) => {
      catInfo.appendChild(breedImg);
      catInfo.insertAdjacentHTML('beforeend', markup);
      loader.style.display = 'none';
    })
    .catch(error => {
      errorText.style.display = 'block';
      loader.style.display = 'none';
      console.error('Произошла ошибка:', error);
    });
}

function createMarkup(name, description, temperament) {
  return `
        <div class="cat">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span class= "temperament">Temperament:</span> ${temperament}</p>
      </div>`;
}
