import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

import refs from './js/refs';

import debounce from 'lodash.debounce';
import getRequest from './js/apiService';
import listMarkup from './templates-handlebars/listMarkup.hbs';
import modalShow from './js/modal-show';
import info from './js/notification';

let pageNumber = null;
let searchQuery = null;

const debouncedInputCallback = debounce(event => {
  refs.gallery.innerHTML = '';
  pageNumber = 1;
  searchQuery = event.target.value;
  if (!searchQuery) {
    return;
  }

  requestImages();
  return searchQuery;
}, 500);

function requestImages() {
  getRequest(searchQuery, pageNumber).then(({ data: { total, hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));
    modalShow();

    if (total === 0) {
      info({ text: 'No any pictures was found according to your request' });
      return;
    }

    observation();

    info({ text: `Was found ${total} pictures` });
  });
}

function observation() {
  const observedEl = document.querySelectorAll('.io');

  const options = {
    rootMargin: '200px',
  };
  const onEntries = (entries, options) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadExtraPictures();
      }
    });
  };
  const observer = new IntersectionObserver(onEntries, options);
  observedEl.forEach(el => observer.observe(el));
}

function loadExtraPictures() {
  pageNumber += 1;
  getRequest(searchQuery, pageNumber).then(({ data: { hits } }) => {
    refs.gallery.insertAdjacentHTML('beforeend', listMarkup(hits));
    modalShow();
  });
}

refs.form.addEventListener('input', debouncedInputCallback);
