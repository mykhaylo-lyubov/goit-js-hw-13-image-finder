import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import refs from './js/refs';

import debounce from 'lodash.debounce';
import getRequest from './js/apiService';
import listMarkup from './templates-handlebars/listMarkup.hbs';
import modalShow from './js/modal-show';
import { info } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
defaults.delay = 1000;

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

  getRequest(searchQuery, pageNumber).then(({ data: { total, hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));
    modalShow();
    info({ text: `Was found ${total} pictures` });
  });

  refs.loadMoreBtn.classList.remove('is-hidden');
  return searchQuery;
}, 500);

function loadMoreButtonHandler() {
  pageNumber += 1;
  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));
    modalShow();
  });
}

refs.form.addEventListener('input', debouncedInputCallback);

refs.loadMoreBtn.addEventListener('click', () => {
  loadMoreButtonHandler();
});
