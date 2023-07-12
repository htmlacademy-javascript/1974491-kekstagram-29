import { getRandomElements, getRandomInteger } from "./utils.js";

/**
 * тексты
 * отсюда мы должны будем брать тексты комментария и использовать
 */
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/**
 * имя пользователя
 * отсюда берем для структуры
 */
const USERS_NAME = [
  'Роман',
  'Татьяна',
  'Оксана',
  'Лера',
  'Александр',
  'Александра',
  'Максим',
  'Марина',
  'Вераника-Чика-Чика'
];

/**
 * описание фотографий
 * отсуда берем описания фото
 */
const DESCRIPTIONS_PHOTO = [
  'Дождь',
  'Где закат?',
  'Волны будут',
  'Угощайся',
  'Попугаи смеются',
  'Кошечки',
  'Дорога будет?',
  'ЗАчем мы здесь?',
  'Смысла нет'
];

/**
 * количество загруженных фотографий
 * устанавливаем количество загружаемых фотографий. Количество по заданию
 */
const NUMBER_OF_ALL_PHOTO = 25;

/**количество лайков
 * пределы выбраны по заданию
 *
 */
const NumberOfLikes = {
  MIN: 15,
  MAX: 200,
};

/**
 * количество комментариев
 * пределы выбраны по заданию
 */
const NumberOfAllComments = {
  MIN: 0,
  MAX: 30,
};

/**
 * Количество аватарок
 * пределы выбраны по заданию
 */
const NumberOfAllAvatar = {
  MIN: 1,
  MAX: 6,
};

/**
 * Функция для генерации порядкого номера
 * @param {int} result - порядковый номер
 */
const getIdGenerator = () => {
  let firstGenerateId = 0;
  return () => {
    firstGenerateId += 1;
    return firstGenerateId;
  };
};

const generatePhotoId = getIdGenerator();
const generatePhotoUrl = getIdGenerator();
const generateCommentsId = getIdGenerator();

/**
  * Функция для создания комментария к фото
  * @param {int} id - идентификатор комментария
  * @param {string} avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
  * @param {string} message - сам комментарий
  * @param {string} name - имя пользователя оставившего комментарий
  * @param {Array} return arrayComments[] - возвращает массив комментариев
*/
const generateCommentsPhoto = () => {
  const Comments = [];
  for (let i = 0; i < getRandomInteger(NumberOfAllComments.MIN, NumberOfAllComments.MAX); i++) {
    Comments.push({
      id: generateCommentsId(),
      avatar: `img/avatar-${getRandomInteger(NumberOfAllAvatar.MIN, NumberOfAllAvatar.MAX)}.svg`,
      message: getRandomElements(MESSAGES),
      name: getRandomElements(USERS_NAME),
    });
  }
  return Comments;
};

/**
  * Функция для создания объекта с описанием фотографии
  * @param {int} id - идентификатор фотографии
  * @param {string} url - ссылка на фотографию
  * @param {string} description - описание фотографии
  * @param {int} likes - количество лайков
  * @param {Array} generateCommentsToPhoto() - массив комментариев
*/
const generatePhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomElements(DESCRIPTIONS_PHOTO),
  likes: getRandomInteger(NumberOfLikes.MIN, NumberOfLikes.MAX),
  comments: generateCommentsPhoto(),
});


/**
 * Функция для создания массива объектов длиной NUMBER_OF_ALL_PHOTO с описанием фотографий
*/
const generatePhotos = () => Array.from({ length: NUMBER_OF_ALL_PHOTO }, generatePhoto);

export {generatePhotos};
