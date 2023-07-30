const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
let failMessageClone;
let successMessageClone;

const closeFailMessage = () => {
  failMessageClone.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  failMessageClone = '';
};

const closeSuccessMessage = () => {
  successMessageClone.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  successMessageClone = '';
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (failMessageClone) {
      closeFailMessage();
      return;
    }
    closeSuccessMessage();
  }
}

const onSuccessMessageButtonClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const onErrorMessageButtonClick = (evt) => {
  evt.preventDefault();
  closeFailMessage();
};

const onSuccessMessageClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const onErrorMessageClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeFailMessage();
  }
};

const renderFailMessage = () => {
  failMessageClone = failMessageTemplate.cloneNode(true);
  document.body.append(failMessageClone);
  document.addEventListener('keydown', onDocumentKeydown);
  failMessageClone.querySelector('.error__button').addEventListener('click', onErrorMessageButtonClick);
  failMessageClone.addEventListener('click', onErrorMessageClick);
};

const renderSuccussMessage = () => {
  successMessageClone = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageClone);
  document.addEventListener('keydown', onDocumentKeydown);
  successMessageClone.querySelector('.success__button').addEventListener('click', onSuccessMessageButtonClick);
  successMessageClone.addEventListener('click', onSuccessMessageClick);
};

export {renderFailMessage, renderSuccussMessage};
