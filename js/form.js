//используемые константы
const HASHTAGS_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i; //Символы для хэштега
const MAX_COMMENTS_LENGTH = 140; //максимвальное количество комментариев
const MAX_HASHTAGS_COUNT = 5; //максимальное значение хэштегов
const MAX_PERCENT_SCALE = '100%'; //максимвальный процент масштаба
const MIN_PERCENT_SCALE = '25%'; //минимальный процент масштаба
const STEP_PERCENT_SCALE = 25; //шаг процентов масштаба
const DEVIDER_SCALE = 100; //делительная шкала


const img = document.querySelector('.img-upload__preview img');
const input = document.querySelector('.scale__control--value');
const biggerScale = document.querySelector('.scale__control--bigger');
const smallerScale = document.querySelector('.scale__control--smaller');

const changeScale = (value) => {
 img.style.transform = `scale(${+value.replace('%','') / DEVIDER_SCALE})`;
};

const removeScale = () => {
if (input.value !== MIN_PERCENT_SCALE) {
    input.value = `${+input.value.replace('%','') - STEP_PERCENT_SCALE}%`;
    changeScale(input.value);
};
};

const addScale = () => {
    if (input.value !== MAX_PERCENT_SCALE) {
        input.value = `${+input.value.replace('%','') + STEP_PERCENT_SCALE}%`;
        changeScale(input.value);
    };
    };

const activateScale = () => {
    biggerScale.addEventListener('click', addScale);
    smallerScale.addEventListener('click', removeScale);
};

const resetScale = () => changeScale(input.value);


const form = document.querySelector('.img-upload__form');
const commentField = document.querySelector('.text__description');
const hashtagsField = document.querySelector('.text__hashtags');

const pristine = new Pristine (form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextCClass: 'img-upload__field-wrapper__error',
});

const isValidComment = (comment) => comment.length <= MAX_COMMENTS_LENGTH;

const createHashtagArray = (value) => value.trim().toLowerCase().split(' ').filter((item) => item);

const isValidHashtag = (value) => {
    if (!value) {
        return true;
    };

    const hashtags = createHashtagArray(value);
    return hashtags.every((test) => HASHTAGS_SYMBOLS.test(test));
};

const isValidCount = (value) => {
    const hashtags = createHashtagArray(value);
    return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const isUniqueHashtags = (value) => {
    const hashtags = createHashtagArray(value);
    const uniqHashtags = new Set (hashtags);
    return uniqHashtags.size === hashtags.length;
}

const addPristine = () => {
    pristine.addValidator (
        hashtagsField,
        isValidHashtag,
        'Хэштег должен начинаться с "#", содержать буквы и цифры (не более 20 символов, включая #)',
    );

    pristine.addValidator (
        hashtagsField,
        isUniqueHashtags,
        'Хэштеги не должны повторяться',
    );

    pristine.addValidator (
        hashtagsField,
        isValidCount,
        'Нельзя указывать больше 5 хэштегов',
    );

    pristine.addValidator (
        commentField,
        isValidComment,
        'Длина комментария не должна превышать 140 символов',
    );
};

const resetPristine = () => pristine.reset();
const validatePristine = () => pristine.validate();

const uploadContainer = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('.img-upload__input');
const uploadFileCancel = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeUploadFile();
  }
};

const onCancelButtonClick = () => closeUploadFile();
const onFileInputChange = () => openUploadFile();

const onFormSubmit = (evt) => {
  if(!validatePristine()) {
  evt.preventDefault ();
}
};

const openUploadFile = () => {
  uploadContainer.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  activateScale();
  addPristine();
};

const closeUploadFile = () => {
  form.reset();
  resetScale();
  resetPristine();
  uploadContainer.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addFormAction = () => {
  uploadFileInput.addEventListener('change', onFileInputChange);
  uploadFileCancel.addEventListener('click', onCancelButtonClick);
  form.addEventListener('submit', onFormSubmit);
};

export {addFormAction}
