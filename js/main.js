import { getData } from './api.js';
// import { generatePhotos } from './data.js';
// import { renderingGallery } from './gallery.js';
import { generateThumbnails } from './thumbnail.js';
import { getPictureClick } from './big-picture.js';
import { showAlert } from './util.js';
import { showSuccess } from './success.js';
import { setUserFormSubmit } from './form.js';


const imgUploadPreview = document.querySelector('.img-upload__preview img');

const fileInput = document.querySelector('#upload-file');
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imgUploadPreview.src = reader.result;
  });

  reader.readAsDataURL(file);
});

// renderingGallery (generatePhotos());

getData()
  .then((posts) => {
    generateThumbnails(posts);
    getPictureClick(posts);
  })
  .catch(
    (err) => {
      showAlert(err);
    }
  );

setUserFormSubmit(showSuccess);

