import { EscKey } from './functions.js';

const body = document.querySelector('body');
const successFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content;

/**
 * Функция, добавляющая попап Success на страницу
 */
const showSuccess = () => {
  const successPopup = successTemplate.cloneNode(true);
  successFragment.appendChild(successPopup);
  body.appendChild(successFragment);
  const successButton = document.querySelector('.success__button');
  document.addEventListener('keydown', onDocumentKeydownPopup);
  document.addEventListener('click', onDocumentClick);
  successButton.addEventListener('click', removeSuccess);
};

/**
 * Функция, получающая переменную с попапом
 */
const getSuccessPopup = () => document.querySelector('.success');

/**
 * Функция, удаляющая попап
 */
function removeSuccess () {
  const addedSuccessPopup = getSuccessPopup();
  addedSuccessPopup.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('click', removeSuccess);
  document.removeEventListener('keydown', onDocumentKeydownPopup);
}

/**
 * Функция, закрывающая попап по клику на произвольную область экрана за пределами
 */
function onDocumentClick(evt) {
  const addedSuccessPopup = getSuccessPopup();
  if (evt.target === addedSuccessPopup) {
    removeSuccess();
  }
}

/**
 * Функция, закрывающая попап по нажатию кнопки Esc
 */
function onDocumentKeydownPopup(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    removeSuccess();
  }
}

export {showSuccess};
