import './styles.css';

import listMarkup from './templates-handlebars/listMarkup.hbs';
import refs from './js/refs';
import getRequest from './js/apiService';

refs.form.addEventListener('input', event => {
  refs.gallery.innerHTML = '';
  getRequest(event.target.value, 1).then(({ data: { hits } }) =>
    refs.gallery.insertAdjacentHTML('afterbegin', listMarkup(hits)),
  );
});
