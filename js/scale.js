const MAX_PERCENT_SCALE = 100; //максимвальный процент масштаба
const MIN_PERCENT_SCALE = 25; //минимальный процент масштаба
const STEP_PERCENT_SCALE = 25; //шаг процентов масштаба

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');


let defaultControlValue = 100;
scaleControlValue.value = `${defaultControlValue.toString()}%`;

//Функция, вычисляющая масштаб изображения
const scaleImage = () => {
  scaleControlValue.value = `${defaultControlValue.toString()}%`;
  const transformValue = defaultControlValue / 100;
  imgUploadPreview.style.transform = `scale(${transformValue})`;
};
//Событие по клику, уменьшающее масштаб
scaleControlSmaller.addEventListener('click', () => {
  if (defaultControlValue > MIN_PERCENT_SCALE) {
    defaultControlValue -= STEP_PERCENT_SCALE;
    scaleImage();
  }
});

//Событие по клику, увеличивающее масштаб
scaleControlBigger.addEventListener('click', () => {
  if (defaultControlValue < MAX_PERCENT_SCALE) {
    defaultControlValue += STEP_PERCENT_SCALE;
    scaleImage();
  }
});

//Функция, обнуляющая масштаб до значения по умолчанию
const resetScale = () => {
  defaultControlValue = 100;
  scaleImage();
};


export { resetScale };

