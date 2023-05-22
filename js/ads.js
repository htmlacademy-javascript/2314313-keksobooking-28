
import { TYPES_ON_RUS } from './data.js';
import { createAllData } from './data.js';
const adContainer = document.querySelector('#map-canvas');

const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();

const isEmptyOrNull = (arrOrString) => {
  if(arrOrString.length === 0){
    return false;
  }
  return true;
};

const createPosterProps = ({author, offer}) => {
  const props = [
    {
      avatar: {
        querySelector : '.popup__avatar',
        condition : isEmptyOrNull(author.avatar),
        targetProp : 'src',
        targetValue : author.avatar,
      }
    },
    {
      title: {
        querySelector : '.popup__title',
        condition : isEmptyOrNull(offer.title),
        targetProp : 'textContent',
        targetValue : offer.title,
      }
    },
    {
      address: {
        querySelector : '.popup__text--address',
        condition : isEmptyOrNull(offer.address),
        targetProp : 'textContent',
        targetValue : offer.address,
      }
    },
    {
      price: {
        querySelector : '.popup__text--price',
        condition : isEmptyOrNull(offer.price),
        targetProp : 'textContent',
        targetValue : `${offer.price} ₽/ночь`,
      }
    },
    {
      type: {
        querySelector : '.popup__type',
        condition : isEmptyOrNull(offer.type),
        targetProp : 'textContent',
        targetValue : TYPES_ON_RUS[offer.type],
      }
    },
    {
      capacity: {
        querySelector : '.popup__text--capacity',
        condition : isEmptyOrNull(offer.rooms) || isEmptyOrNull(offer.guests),
        targetProp : 'textContent',
        targetValue : `${offer.rooms} комнаты для ${offer.guests} гостей`,
      }
    },
    {
      time: {
        querySelector : '.popup__text--time',
        condition : isEmptyOrNull(offer.checkin) || isEmptyOrNull(offer.checkout),
        targetProp : 'textContent',
        targetValue : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
      }
    },
    {
      features: {
        querySelector : '.popup__features',
        condition : isEmptyOrNull(offer.features),
        targetProp : 'textContent',
        targetValue : offer.features,
      }
    },
    {
      description: {
        querySelector : '.popup__description',
        condition : isEmptyOrNull(offer.description),
        targetProp : 'textContent',
        targetValue : offer.description,
      }
    },
    {
      photos: {
        querySelector : '.popup__photos',
        condition : isEmptyOrNull(offer.photos),
        targetProp : 'src',
        targetValue : offer.photos,
      }
    },
  ];
  return props;
};

const renderFeatures = (arrFeatures, list) => {
  list.innerHTML = '';
  for(let i = 0; i < arrFeatures.length; i++){
    const elList = document.createElement('li');
    elList.classList.add('popup__feature', `popup__feature--${arrFeatures[i]}`);
    list.appendChild(elList);
  }
};

const renderPhotos = (arrPhotos, list, photo) => {
  list.innerHTML = '';

  for(let i = 0; i < arrPhotos.length; i++){
    const img = photo.cloneNode(true);
    img.removeAttribute('src');
    img.src = arrPhotos[i];
    list.appendChild(img);
  }
};

const renderDefault = (condition, targetProp, targetElement, targetValue) => {
  if(condition){
    targetElement[targetProp] = targetValue;
  } else {
    targetElement.remove();
  }
};

const renderPosterProp = (ad, value) => {
  const querySelector = value.querySelector;
  const condition = value.condition;
  const targetProp = value.targetProp;
  const targetValue = value.targetValue;
  const photosList = ad.querySelector('.popup__photos');
  const photo = photosList.querySelector('.popup__photo');
  const featuresList = ad.querySelector('.popup__features');
  const targetElement = ad.querySelector(querySelector);
  switch(querySelector) {
    case '.popup__features' :
      renderFeatures(targetValue, featuresList);
      break;
    case '.popup__photos':
      renderPhotos(targetValue, photosList, photo);
      break;
    default:
      renderDefault(condition, targetProp, targetElement, targetValue);
      break;
  }
  fragment.append(targetElement);
};

const getPosterProps = () => {
  const allData = createAllData();
  const data = allData[0];
  const posterProps = createPosterProps(data);
  const ad = adTemplate.cloneNode(true);
  posterProps.forEach((item) => Object.values(item).map((value) => renderPosterProp(ad, value)));
};

const addAd = () => {
  getPosterProps();
  adContainer.append(fragment);
};


export { addAd };
