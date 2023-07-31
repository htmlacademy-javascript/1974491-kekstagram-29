import { EscKey } from './functions.js';

const body = document.querySelector('body');
const errorFragment = document.createDocumentFragment();
const errorTemplate = document.querySelector('#error').content;

/**
 * Функция, добавляющая попап Error на страницу
 */
const showError = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorPopup);
  body.appendChild(errorFragment);
  const errorButton = document.querySelector('.error__button');
  document.addEventListener('keydown', onDocumentKeydownPopup);
  document.addEventListener('click', onDocumentClick);
  errorButton.addEventListener('click', removeError);
};

/**
 * Функция, получающая переменную с попапом
 */
const getErrorPopup = () => document.querySelector('.error');

/**
 * Функция, удаляющая попап
 */
function removeError () {
  const addedErrorPopup = getErrorPopup();
  addedErrorPopup.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('click', removeError);
  document.removeEventListener('keydown', onDocumentKeydownPopup);
}

/**
 * Функция, закрывающая попап по клику на произвольную область экрана за пределами
 */
function onDocumentClick(evt) {
  const addedErrorPopup = getErrorPopup();
  if (evt.target === addedErrorPopup) {
    removeError();
  }
}

/**
 * Функция, закрывающая попап по нажатию кнопки Esc
 */
function onDocumentKeydownPopup(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    removeError();
  }
}

export {showError};
