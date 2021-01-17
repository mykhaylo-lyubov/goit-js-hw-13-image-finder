import axios from 'axios';
// import './eventListener';

const API_KEY = '19860281-90612ce799b065a61c0a9e7bf';
const itemsPerPage = 12;

axios.defaults.baseURL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

function getRequest(searchQuery, pageNumber) {
  return axios
    .get(
      `&key=${API_KEY}&q=${searchQuery}&page=${pageNumber}&per_page=${itemsPerPage}`,
    )
    .catch(error => console.log(error));
}

export default getRequest;
