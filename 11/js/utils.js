/**
 * Функция для создания случайного числа в диапозоне от а до b
 * @param {int} a - нижняя граница диапозона
 * @param {int} b - верхняя граница диапозона
 * @param {int} result - возвращает случайное число в диапозоне от а до b
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


/**
 * Функция для генерации случайного элемента массива
 * @param {int} element - сам массив
 * @param {string} result - элемент массива element
 */
const getRandomElements = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomElements, getRandomInteger};
