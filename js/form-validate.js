import { showSuccess, showError } from './message-show.js';
const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const fieldRooms = form.querySelector('#room_number');
const fieldGuests = form.querySelector('#capacity');
const priceErrorMessage = 'Не больше 100000';
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const typeInput = document.querySelector('#type');
const imagesInput = document.querySelector('#images');
const submitButton = document.querySelector('.ad-form__submit');
const errImg = 'Такой формат не подходит';
const roomsOptions = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0']
};

const typesOfHousing = {
  'bungalow' : '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace' : '10000'
};

const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

let selectedHousing = 'flat';

const changePlaceholder = () => {
  price.placeholder = typesOfHousing[typeInput.value];
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
}, false);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const validateRooms = () => roomsOptions[fieldRooms.value].includes(fieldGuests.value);

const getRoomsErrMessageRooms = () => `${!(fieldRooms.value === '100') ? 'Мало комнат' : 'Не для гостей'}`;
const getRoomsErrMessageGuests = () => `${!(fieldGuests.value === 'не для гостей') ? 'Слишком много гостей' : 'Только 100 комнат'}`;

pristine.addValidator(fieldGuests, validateRooms, getRoomsErrMessageGuests);
pristine.addValidator(fieldRooms, validateRooms, getRoomsErrMessageRooms);

const validatePriceForHouses = (value) => (parseInt(value, 10) >= parseInt(typesOfHousing[selectedHousing], 10));

const getErrMessagePriceForDifferentHouses = () => `Не ниже ${price.placeholder}`;

pristine.addValidator(price, validatePriceForHouses, getErrMessagePriceForDifferentHouses);

const onChangeHousing = (evt) => {
  selectedHousing = evt.target.value;
  price.placeholder = typesOfHousing[selectedHousing];
  pristine.validate(price);
};

typeInput.addEventListener('change', onChangeHousing);

const onChangeTimeIn = (evt) => {
  timeOut.value = evt.target.value;
};
const onChangeTimeOut = (evt) => {
  timeIn.value = evt.target.value;
};

timeIn.addEventListener('change', onChangeTimeIn);
timeOut.addEventListener('change', onChangeTimeOut);

pristine.addValidator(price, (value) => {
  if(value <= 100000){
    return true;
  } return false;
}, priceErrorMessage);

const validateImages = (url) => /.jpg$/i.test(url) || /.png$/i.test(url) || /.jpeg$/i.test(url);

pristine.addValidator(imagesInput, validateImages, errImg);
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      const formData = new FormData(evt.target);
      fetch('https://28.javascript.pages.academy/keksobooking',
        {
          method : 'POST',
          type : 'multipart/form-data',
          body : formData,
        })
        .then((response) => {
          if(response.ok){
            showSuccess();
            onSuccess();
          } else {
            showError();
          }
        }
        )
        .catch(() => {
          showError();
        })
        .finally(() => unBlockSubmitButton());
    }
  });
};

export{ form, price, setUserFormSubmit, changePlaceholder };
