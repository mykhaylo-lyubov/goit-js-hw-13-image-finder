import * as basicLightbox from 'basiclightbox';
import refs from '../js/refs';

function modalShow() {
  refs.gallery.addEventListener('click', event => {
    const instance = basicLightbox.create(
      `<img src="${event.target.dataset.largeImageUrl}">`,
    );
    instance.show();
  });
}

export default modalShow;
