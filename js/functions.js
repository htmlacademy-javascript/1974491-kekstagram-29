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

export {polindromeTrue, lengthCheck};

