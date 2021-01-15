import * as basicLightbox from 'basiclightbox';

function modalShow() {
  const image = document.querySelectorAll('img');
  image.forEach(el =>
    el.addEventListener('click', event => {
      console.log(el);
      const instance = basicLightbox.create(
        `<img src="${el.dataset.largeImageUrl}">`,
      );
      instance.show();
    }),
  );
}

export default modalShow;
