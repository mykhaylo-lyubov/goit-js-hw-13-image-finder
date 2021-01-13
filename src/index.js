import './styles.css';

import listMarkup from './templates-handlebars/listMarkup.hbs';
import refs from './js/refs';
import getRequest from './js/apiService';

let pageNumber = 1;
let searchQuery = null;

refs.form.addEventListener('input', event => {
  refs.gallery.innerHTML = '';
  searchQuery = event.target.value;

  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits)),
  );

  return searchQuery;
});

refs.loadMoreBtn.addEventListener('click', () => {
  pageNumber += 1;

  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits)),
  );
});
