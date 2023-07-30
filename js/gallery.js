import { generateThumbnails } from './thumbnail.js';
import { openBigPic } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderingGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openBigPic(picture);
  });

  generateThumbnails(pictures. container);
};

export { renderingGallery };
