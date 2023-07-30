import { openBigPic } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

/**
 *Функция для создания шаблона
 *@param {object} объект, который передаёт комментарии, описания, кол-во лайков и урл
 *@returns {Element} возвращкаем thumbnailзаполненный параметрами
 */
const createThumbnail = ({comments, discription, likes, url, id}) =>{
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__comments').textContent = comments.length;//количество комментариев через длину массива
  thumbnail.querySelector('.picture__img').alt = discription;//описание фото
  thumbnail.querySelector('.picture__likes').textContent = likes;//количество лайков
  thumbnail.querySelector('.picture__img').src = url;//адрес ссылки
  thumbnail.dataset.smallPhotoId = id;
  thumbnail.addEventListener('click', () => {
    openBigPic({url, likes, discription, comments, id});
  });

  return(thumbnail);
};

/**
 *Функция для отрисовки мини-фото
 *@param {Array} массив фотографий, каждая должна содержать все необходимые параметры
 *@returns {Element} возврат готового элемента для вставки в DOM
 */
const generateThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();//создаём контейнер
  pictures.forEach((picture) =>{ //
    const thumbnail = createThumbnail(picture); //
    fragment.append(thumbnail); //
  });
  container.append(fragment); //добавляем элемент в DOM
};

export { generateThumbnails };
