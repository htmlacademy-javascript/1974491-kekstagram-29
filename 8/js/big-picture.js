import { EscKey } from './functions.js';

const COMMENTS_PER_PORTION = 5;

const fullSizePhoto = document.querySelector('.big-picture');//Большое всплывающее окно
const bodyElement = document.querySelector('body');//
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel');//кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments');//список комментов
const commentItem = commentsList.querySelector('.social__comment');//элемент списка комментов
const commentsCount = fullSizePhoto.querySelector('.social__comment-count');//счетчик количества коментов
const commentsButttonLoad = fullSizePhoto.querySelector('.comments-loader');//кнопка загрузки новой партии коментов
const allCommentsCount = fullSizePhoto.querySelector('.comments-count');//счетчик количества всех комментариев

let comments = [];
let commentsShown = 0;

/**
 * Функция создания одного комментария
 * @param {object}
 * @returns {object}
*/
const createComment = ({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

/**
 * Функция создания-отрисовки массива-списка комментариев
 *
 */
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;
  if (commentsShown >= comments.length) {
    commentsButttonLoad.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsButttonLoad.classList.remove('hidden');
  }


  const commentsFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsFragment.append(comment);
  }

  commentsList.append(commentsFragment);
  commentsCount.textContent = commentsShown;
  allCommentsCount.textContent = comments.length;
};

/**
 * функция закрытия картинок
 * добавляем класс .hidden обычным фото
 * убираем класс overflow-hidden
 *
 */
const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
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

//Функция по отрисовки карточки при открытии в модалке
const renderPictureInformation = ({url, likes, description}) => {
  fullSizePhoto.querySelector('.big-picture__img img').src = url;
  fullSizePhoto.querySelector('.big-picture__img img').alt = description;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.social__caption').textContent = description;
};

//добавление комментов в список
const onCommentsLoadClick = (dataComments) => {
  renderComments(dataComments);
};


/**
 * Отрисовка модального окошка. Работаем с классами. Добавляем и убираем.
 * @param {int} id - идентификатор фотографии
 * @param {string} url - ссылка на фотографию
 * @param {string} description - описание фотографии
 * @param {int} likes - количество лайков
 * @param {Array} comments - массив комментариев делали в data.jsteComment(comments[i]);
    commentsFragment.append(comment);
  }

 */
const openBigPic = (data) => {
  commentsList.innerHTML = '';
  comments = data.comments;
  fullSizePhoto.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsButttonLoad.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
  document.addEventListener ('keydown', onDocumentKeydown);
  renderPictureInformation(data);
  renderComments(data.comments);

  commentsCount.textContent = `${commentsShown} из ${allCommentsCount.textContent} комментариев`;

};

//Ждём click для запуска отрисовки
commentsButttonLoad.addEventListener('click', () => {
  onCommentsLoadClick(comments);
});


export { openBigPic, closeBigPic };
