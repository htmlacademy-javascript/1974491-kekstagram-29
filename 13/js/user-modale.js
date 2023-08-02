import { EscKey } from './util.js';
import {resetScale} from './scale.js';
import {resetEffect} from './form-effects.js';
import {textDescription, textHashtags, pristine} from './user-form.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputUploadFile = document.querySelector('#upload-file');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
//Закрытие модального окна нажатием Esc
const onDocumentKeydown = (evt) => {
  if (evt.target === textHashtags || evt.target === textDescription) {
    evt.stopPropagation();
  } else {
    if (EscKey(evt)) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  }
};

//Функция, открывающая модальное окно
const onUploadFile = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

//Функция, закрывающая модальное окно
function closeUploadOverlay() {
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

//Событие, отслеживающее загрузку изображения
inputUploadFile.addEventListener('change', onUploadFile);

//Закрытие модального окна по клику
uploadCancel.addEventListener('click', closeUploadOverlay);

export {closeUploadOverlay};
