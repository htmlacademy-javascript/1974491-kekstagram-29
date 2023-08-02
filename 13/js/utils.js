const ALERT_SHOW_TIME = 5000;

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

/**
 * Функция обнаружения нажатия клавиши "Esc"
 * @param {key} evt - нажата клавиша
 * @returns {boolean} - ИСТИНА если клавиша "Esc"
 */
const EscKey = (evt) => evt.key === 'Escape';

const alertFragment = document.createDocumentFragment();
const alertTemplate = document.querySelector('#error-server').content;
const body = document.querySelector('body');

const showAlert = () => {
  const alertMessage = alertTemplate.cloneNode(true);
  alertFragment.appendChild(alertMessage);
  body.appendChild(alertFragment);

  setTimeout(() => {
    const alertContainer = document.querySelector('.error-server');
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomElements, getRandomInteger, showAlert, EscKey};
