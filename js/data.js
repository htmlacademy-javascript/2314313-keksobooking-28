import { getRandomInteger, getRandomGeoLoc, checkMatch, createArray, getUniqueRandomInteger} from './util.js';

const MIN_INDEX = 1;
const MAX_INDEX = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DEFAULT_NUM = 10;

const TITLES = [
  'Заголовок 3',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const typesOnRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

let lat;
let lng;

const getUniqueAddressImg = getUniqueRandomInteger(MIN_INDEX, MAX_INDEX);

const createAuthorObject = () => {
  const author = new Object();
  const idx = getUniqueAddressImg();

  const avatarId = idx < MAX_INDEX ? `0${idx}` : idx;
  author.avatar = `img/avatars/user${avatarId}.png`;
  return author;
};


const createOfferObject = () => {
  const offer = new Object();
  lat = getRandomGeoLoc(MIN_LAT, MAX_LAT);
  lng = getRandomGeoLoc(MIN_LNG, MAX_LNG);
  offer.title = TITLES[getRandomInteger(0, TITLES.length - 1)];
  offer.address = `${lat}, ${lng}`;
  offer.price = getRandomInteger(1, 10000000000);
  offer.type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  offer.rooms = getRandomInteger(1, 10);
  offer.guests = getRandomInteger(1, 10);
  offer.checkin = CHECK_IN_OUT[getRandomInteger(0, CHECK_IN_OUT.length - 1)];
  offer.checkout = CHECK_IN_OUT[getRandomInteger(0, CHECK_IN_OUT.length - 1)];
  offer.features = checkMatch(FEATURES);
  offer.description = DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  offer.photos = createArray(PHOTOS);
  return offer;
};

const createLocation = () => {
  const location = new Object();
  location.lat = lat;
  location.lng = lng;
  return location;
};

const createData = () => {
  const announcement = new Object();
  announcement.author = createAuthorObject();
  announcement.offer = createOfferObject();
  announcement.location = createLocation();
  return announcement;
};

const createAllData = () => Array.from({ length: DEFAULT_NUM }, () => createData());

export { createAllData, typesOnRus , createData};
