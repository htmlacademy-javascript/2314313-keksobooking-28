import { isEscapeKey } from './util.js';
const TEXT_PARAGRAPH = 'Ошибка сервера. Перезагрузите страницу.';
const successElement = document.querySelector('#success').content.querySelector('.success');
const errElement = document.querySelector('#error').content.querySelector('.error');

const closeSuccessOrErr = () => {
  const successModalWindow = document.querySelector('.success');
  const errModalWindow = document.querySelector('.error');
  const errServerModalWindow = document.querySelector('.error__server');
  document.body.classList.remove('modal-open');
  if(successModalWindow){
    successModalWindow.remove();
  } else if(errModalWindow){
    const errButton = errModalWindow.querySelector('.error__button');
    errModalWindow.remove();
    errButton.removeEventListener('click', closeSuccessOrErr);
  } else if (errServerModalWindow) {
    errServerModalWindow.remove();
  }
};

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closeSuccessOrErr();
    document.removeEventListener('keydown', onDocumentKeyDown);
  }
};

const onModalClick = (evt) => {
  if(evt.target === evt.currentTarget){
    evt.preventDefault();
    closeSuccessOrErr();
    document.removeEventListener('click', onModalClick);
  }
};

const showSuccess = () => {
  document.body.insertAdjacentElement('beforeend', successElement);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  const successModalWindow = document.querySelector('.success');
  successModalWindow.addEventListener('click', onModalClick);
};

const showError = () => {
  document.body.insertAdjacentElement('beforeend', errElement);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  const errModalWindow = document.querySelector('.error');
  const errButton = errModalWindow.querySelector('.error__button');
  errModalWindow.addEventListener('click', onModalClick);
  errButton.addEventListener('click', closeSuccessOrErr);
};

const showErrGet = () => {
  const div = document.createElement('div');
  const paragraph = document.createElement('p');
  div.appendChild(paragraph);
  div.classList.add('error__server');
  paragraph.classList.add('error__message');
  paragraph.textContent = TEXT_PARAGRAPH;
  document.body.insertAdjacentElement('beforeend', div);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  const errServerModalWindow = document.querySelector('.error__server');
  errServerModalWindow.addEventListener('click', onModalClick);
};


export { showError, showSuccess, showErrGet };
