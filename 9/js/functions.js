/**
 *      Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 * @param {int} maxLength - длина строки для проверки
 * @param {string} someString - какая-то строка
 * @return {boolean} - истина, если строка меньше либо равна заданой длине
 */
function lengthCheck (someString, maxLength) {
  return maxLength <= someString.length;
}

/**
 * Функция для проверки, является ли строка палиндромом.
 * @param {string} polindrome - проверяемая строка
 * @returns {boolean} - истина, если полиндром
 */
function polindromeTrue (polindrome) {
  return polindrome.toUpperCase().replaceAll(' ','') === polindrome.toUpperCase().replaceAll(' ','').split('').reverse().join('');
}

/**
 * Функция для перевода времени на часах в минуты
 * @param {string} time - исходное время
 * @param {int} - возвращает значение в минутах
 */
const getTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Функция для проверки происходит ли встреча в рабочее время
 * @param {int} startWork - начало рабочего времени
 * @param {int} endWork - конец рабочего времени
 * @param {int} startMetting - начало встречи
 * @param {int} timeMeeting - время встречи
 * @param {boolean} - возвращает значение была ли встреча в рабочее время
 */
const getWorkTimeMeeting = (startWork, endWork, startMeeting, timeMeeting) => getTimeInMinutes(startWork) <= getTimeInMinutes(startMeeting) && getTimeInMinutes(startMeeting) <= (getTimeInMinutes(endWork) - timeMeeting);

/**
 * Функция обнаружения нажатия клавиши "Esc"
 * @param {key} evt - нажата клавиша
 * @returns {boolean} - ИСТИНА если клавиша "Esc"
 */
const EscKey = (evt) => evt.key === 'Escape';


export {polindromeTrue, lengthCheck, getWorkTimeMeeting, EscKey};
