const form = document.querySelector('.ad-form');
// const fieldsetsInForm = form.querySelector('fieldset');
// const formMapFilters = document.querySelector('.map__filters');
// const fieldsetInMap = formMapFilters.querySelector('fieldset');
// const mapFilters = formMapFilters.querySelectorAll('.map__filter');
const price = form.querySelector('#price');
const fieldRooms = form.querySelector('#room_number');
const fieldGuests = form.querySelector('#capacity');
const priceErrorMessage = 'Не больше 10000';
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const typeInput = document.querySelector('#type');
const imagesInput = document.querySelector('#images');
price.placeholder = '1000';
const pricePlaceholder = document.querySelector('#price').placeholder;
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

// const beInactivePage = () => {
//   form.classList.add('ad-form--disabled');
//   fieldsetsInForm.classList.add('disabled');
//   formMapFilters.classList.add('ad-form--disabled');
//   fieldsetInMap.classList.add('disabled');
//   mapFilters.classList.add('disabled');
// };

// const beActivePage = () => {
//   form.classList.remove('ad-form--disabled');
//   fieldsetsInForm.classList.remove('disabled');
//   formMapFilters.classList.remove('ad-form--disabled');
//   fieldsetInMap.classList.remove('disabled');
//   mapFilters.classList.remove('disabled');
// };

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: '.error__message::before',
  successClass: '.success__message::before',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  //errorTextClass: 'error__message',

}, false);

const validateRooms = () => roomsOptions[fieldRooms.value].includes(fieldGuests.value);

const getRoomsErrMessageRooms = () => `${!(fieldRooms.value === '100') ? 'Мало комнат' : 'Не для гостей'}`;
const getRoomsErrMessageGuests = () => `${!(fieldGuests.value === 'не для гостей') ? 'Слишком много гостей' : 'Только 100 комнат'}`;

pristine.addValidator(fieldGuests, validateRooms, getRoomsErrMessageGuests);
pristine.addValidator(fieldRooms, validateRooms, getRoomsErrMessageRooms);

const validatePriceForHouses = (value) => {
  const selectedHousing = value;
  return (parseInt(price.value, 10) >= parseInt(typesOfHousing[selectedHousing], 10));
};
const getErrMessagePriceForDifferentHouses = () => `Не ниже ${pricePlaceholder}`;

pristine.addValidator(price, validatePriceForHouses, getErrMessagePriceForDifferentHouses);

const onChangeHousing = (evt) => {
  price.placeholder = typesOfHousing[evt.target.value];
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
  if(value <= 10000){
    return true;
  } return false;
}, priceErrorMessage);

const validateImages = (url) => /.jpg$/i.test(url) || /.png$/i.test(url) || /.jpeg$/i.test(url);

pristine.addValidator(imagesInput, validateImages, errImg);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    evt.preventDefault();
  }
});
