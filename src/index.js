import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import refs from './js/refs';

import debounce from 'lodash.debounce';
import getRequest from './js/apiService';
import listMarkup from './templates-handlebars/listMarkup.hbs';

import * as basicLightbox from 'basiclightbox';

let pageNumber = null;
let searchQuery = null;

const debouncedInputCallback = debounce(event => {
  refs.gallery.innerHTML = '';
  pageNumber = 1;
  searchQuery = event.target.value;
  if (!searchQuery) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));

    const image = document.querySelectorAll('img');
    image.forEach(el =>
      el.addEventListener('click', event => {
        const instance = basicLightbox.create(
          `<img src="${el.dataset.largeImageUrl}">`,
        );
        instance.show();
      }),
    );
  });

  refs.loadMoreBtn.classList.remove('is-hidden');
  return searchQuery;
}, 500);

function loadMoreButtonHandler() {
  pageNumber += 1;
  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));
  });
}

refs.form.addEventListener('input', debouncedInputCallback);

refs.loadMoreBtn.addEventListener('click', () => {
  loadMoreButtonHandler();
});
