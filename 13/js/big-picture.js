import { EscKey } from './functions.js';

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const cancel = document.querySelector('#picture-cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const targetParent = '.picture';

const commentTemplate = socialComment.cloneNode(true);
const similarCommentFragment = document.createDocumentFragment();

//Рендер большого изображения, описания, лайков
const renderBigPicture = (array) => {
  similarCommentFragment.innerHTML = '';
  socialComments.innerHTML = '';
  const {url, description, likes, comments} = array;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  commentsCount.textContent = comments.length.toString();
  renderComments(comments, 0);
};

//Рендер комментариев, загрузка новых комментариев по клику на "Загрузить еще"
function renderComments (commentsArray, loadingComments) {
  loadingComments += 5;
  const commentsToShow = Math.min(commentsArray.length, loadingComments);
  const newComments = commentsArray.slice(loadingComments - 5, commentsToShow);
  for (let i = 0; i < newComments.length; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    const {avatar, message} = newComments[i];
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__text').textContent = message;
    similarCommentFragment.appendChild(commentElement);
  }
  socialCommentCount.textContent = `${commentsToShow} из ${commentsArray.length} комментариев`;
  socialComments.appendChild(similarCommentFragment);

  if (commentsToShow === commentsArray.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', OnMoreCommentsClick);
  }

  function OnMoreCommentsClick () {
    renderComments(commentsArray, loadingComments);
    commentsLoader.removeEventListener('click', OnMoreCommentsClick);
  }
}


//Закрытие попапа кнопкой Esc
const onDocumentKeydown = (evt) => {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Функция открытие попапа
const getPictureClick = (array) => {
  const onPictureClick = (evt) => {
    const target = evt.target;
    const picture = target.closest(targetParent);
    if (!picture) {
      return;
    }
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    const currentPost = array.find(({id}) => (id).toString() === picture.dataset.id);
    renderBigPicture(currentPost);
  };
  //Событие по клику, запускает попап
  pictures.addEventListener('click', onPictureClick);
};

//Функция закрытия попапа
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

//Событие по клику, закрывает попап
cancel.addEventListener('click', () => {
  closeBigPicture();
});

export {getPictureClick};
