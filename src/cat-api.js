import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_vQBMBes7EwPXp3EuY5sFR2Kgvtc9vhg0FxLnb1hLynlYgDa9ZSuJ1Q9r8bjElnyI';

function fetchBreeds() {
  return axios.get('/breeds').then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp;
    });
}

export { fetchBreeds, fetchCatByBreed };
