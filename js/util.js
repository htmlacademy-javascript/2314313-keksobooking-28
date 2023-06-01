
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomGeoLoc = (min, max) => (Math.random() * (max - min) + min).toFixed(5);

const getUniqueRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (data) => data[getRandomInteger(0, data.length - 1)];

const createArray = (array) => Array.from({ length: getRandomInteger(0, array.length - 1)}, () => getRandomArrayElement(array));

const checkMatch = (data) => {
  const uniqSet = new Set(createArray(data));
  return [... uniqSet];
};

const debounce = (callBack, timeToDelay) => {
  let timeOutId;
  return (... rest) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => callBack.apply(this, rest), timeToDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomGeoLoc, checkMatch, createArray, getUniqueRandomInteger, isEscapeKey, debounce };
