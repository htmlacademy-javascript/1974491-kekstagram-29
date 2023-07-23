import { openBigPic } from '../js/big-picture.js';

// 1.что за шаблон #picture и куда его девать?
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// 1.1. находим элементы с классом .picture и присваиваем его container
const container = document.querySelector('.pictures');


// 2.Как и чем заполнить данными для фотографии?
/**
 *Функция для создания шаблона
 *@param {object} объект, который передаёт комментарии, описания, кол-во лайков и урл
 *@returns {Element} возвращкаем thumbnailзаполненный параметрами
 */
const createThumbnail = ({coments, discription, likes, url}) =>{
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__comments').textContent = coments.length;//количество комментариев через длину массива
  thumbnail.querySelector('.picture__img').alt = discription;//описание фото
  thumbnail.querySelector('.picture__likes').textContent = likes;//количество лайков
  thumbnail.querySelector('.picture__img').src = url;//адрес ссылки
  return(thumbnail);
};


// 3.Как отрисовать фотографии? Куда приткнуть DocumentFragment?
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

// Не забыть экспортировать функции
export { generateThumbnails };
