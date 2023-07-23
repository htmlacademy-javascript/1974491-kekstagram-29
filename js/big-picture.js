import { EscKey } from './functions.js';


const fullSizePhoto = document.querySelector('.big-picture');
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');

/**
 * функция закрытия картинок
 * добавляем класс .hidden обычным фото
 * убираем класс overflow-hidden
 *
 */
const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

/**
 * Функция закрытия большой картинки при нажатии Esc
 * @param {Event} evt - событие нажатие кнопки Esc
 */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}

/**
 * Функция закрытия закрытия модального окна
 */
function onCloseButtonClick() {
  closeBigPic();
}

/**
 * Функция создания-отрисовки массива-списка комментариев
 * @param {Array} comments - передаем массив комментарием для создания.
 */
const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
};

/**
 * Отрисовка модального окошка. Работаем с классами. Добавляем и убираем.
 * @param {int} id - идентификатор фотографии
 * @param {string} url - ссылка на фотографию
 * @param {string} description - описание фотографии
 * @param {int} likes - количество лайков
 * @param {Array} comments - массив комментариев делали в data.js
 */
const openBigPic = ({url, likes, description, comments}) => {
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  fullSizePhoto.querySelector('.big-picture__img').src = url;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.comments-count').textContent = comments.length;
  renderComments(comments);
  fullSizePhoto.querySelector('.social__caption').textContent = description;
};


export { openBigPic, closeBigPic };
