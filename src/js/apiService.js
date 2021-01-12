import axios from 'axios';
import './eventListener';

const key = '19860281-90612ce799b065a61c0a9e7bf';
const pageNumber = 1;

axios.defaults.baseURL = `https://pixabay.com/api/?key=${key}`;

// const searchQuery = 'cat';

function getRequest(searchQuery) {
  const url = `/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12`;
  const result = axios.get(`${url}`);
  return result;
}

export default getRequest;
