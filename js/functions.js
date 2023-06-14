//     Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

function lengthCheck (someString, maxLength) {
  return maxLength <= someString.length;
}

lengthCheck('12345', 5);


//     Функция для проверки, является ли строка палиндромом.

// мне нравитсья эта реализация, но по заданию надо сделать не так
/*
function polindromeTrue (polindrome) {
  return polindrome.toUpperCase().replaceAll(' ','') === polindrome.toUpperCase().replaceAll(' ','').split('').reverse().join('');
}
*/

function polindromeTrue (polindrome) {
  const oldString = polindrome.toUpperCase().replaceAll(' ','');
  let newString = '';
  for (let i = oldString.length - 1; i >= 0; i--) {
    newString += oldString.at(i);
  }
  return oldString === newString;

}

polindromeTrue('Лёша на полке клопа нашёл ');

