import './styles.css';

import listMarkup from './templates-handlebars/listMarkup.hbs';
import refs from './js/refs';
import getRequest from './js/apiService';

// const searchQuery = 'wow';

refs.form.addEventListener('change', event => {
  const searchQuery = event.target.value;
  getRequest(searchQuery).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('afterbegin', listMarkup(hits)),
  );
});
