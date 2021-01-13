import './styles.css';

import listMarkup from './templates-handlebars/listMarkup.hbs';
import refs from './js/refs';
import getRequest from './js/apiService';
import debounce from 'lodash.debounce';

let pageNumber = null;
let searchQuery = null;

const debouncedInputCallback = debounce(event => {
  refs.gallery.innerHTML = '';
  pageNumber = 1;
  searchQuery = event.target.value;
  console.log(pageNumber);

  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits)),
  );

  return searchQuery;
}, 500);

function loadMoreButtonHandler() {
  pageNumber += 1;
  console.log(pageNumber);
  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits)),
  );
}

refs.form.addEventListener('input', debouncedInputCallback);

refs.loadMoreBtn.addEventListener('click', loadMoreButtonHandler);
