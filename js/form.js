// import { resetEffect } from './form-effects.js';
import { showError } from './error.js';
// import { resetScale } from './scale.js';
// import { EscKey } from './utils.js';
import {sendData} from './api.js';

//используемые константы
const HASHTAGS_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i; //Символы для хэштега
const MAX_COMMENTS_LENGTH = 140; //максимвальное количество комментариев
const MAX_HASHTAGS_COUNT = 5; //максимальное значение хэштегов

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};

// const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadSubmit = document.querySelector('#upload-submit');
// const inputUploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
// const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
const textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

// //Закрытие модального окна нажатием Esc
// const onDocumentKeydown = (evt) => {
//   if (evt.target === textHashtags || evt.target === textDescription) {
//     evt.stopPropagation();
//   } else {
//     if (EscKey(evt)) {
//       evt.preventDefault();
//       closeUploadOverlay();
//     }
//   }
// };
// //Функция, открывающая модальное окно
// const onUploadFile = () => {
//   imgUploadOverlay.classList.remove('hidden');
//   body.classList.add('modal-open');
//   document.addEventListener('keydown', onDocumentKeydown);
// };
// //Функция, закрывающая модальное окно
// function closeUploadOverlay() {
//   imgUploadForm.reset();
//   pristine.reset();
//   resetScale();
//   resetEffect();
//   imgUploadOverlay.classList.add('hidden');
//   body.classList.remove('modal-open');
//   document.removeEventListener('keydown', onDocumentKeydown);
// }

// //Событие, отслеживающее загрузку изображения
// inputUploadFile.addEventListener('change', onUploadFile);
// //Закрытие модального окна по клику
// uploadCancel.addEventListener('click', closeUploadOverlay);

//Функция, проверяющая лимит по символам у комментария
const validateComment = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(
  textDescription,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

const getHashTags = (value) => value.replace(/ +/g, ' ').trim().split(' ');

//Функция, проверяющая максимальное количество хэштегов
const countHashTags = (value) => {
  const hashTags = getHashTags(value);
  return hashTags.length <= MAX_HASHTAGS_COUNT;
};

pristine.addValidator(
  textHashtags,
  countHashTags,
  'Нельзя добавить больше 5 хэштегов'
);

//Функция, проверяющая правильность написания хэштега
const checkSpellingHashtag = (value) => {
  if (value !== '') {
    const hashTags = getHashTags(value);
    return hashTags.every((hashTag) => HASHTAGS_SYMBOLS.test(hashTag));
  }
  return true;
};

pristine.addValidator(
  textHashtags,
  checkSpellingHashtag,
  'Хэштег должен начинаться с # и не может содержать пробелы, спецсимволы и смайлы. Максимальная длина 20 символов'
);

//Функция на проверку дубликатов хэштегов
const checkDuplicateHashTags = (value) => {
  const hashTags = getHashTags(value);
  const lowerCaseHashTags = hashTags.map((hashTag) => hashTag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

pristine.addValidator(
  textHashtags,
  checkDuplicateHashTags,
  'Хэштеги не должны повторяться'
);

const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = SubmitButtonText.DEFAULT;
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showError(err);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit, pristine, textDescription, textHashtags};


