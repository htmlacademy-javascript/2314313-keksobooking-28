import { typesOnRus } from './data.js';

const fragment = document.createDocumentFragment();

const createPosterProps = ({author, offer}) => {
  const props = [
    {
      avatar: {
        querySelector : '.popup__avatar',
        condition : author.avatar,
        targetProp : 'src',
        targetValue : author.avatar,
      }
    },
    {
      title: {
        querySelector : '.popup__title',
        condition : offer.title,
        targetProp : 'textContent',
        targetValue : offer.title,
      }
    },
    {
      address: {
        querySelector : '.popup__text--address',
        condition : offer.address,
        targetProp : 'textContent',
        targetValue : offer.address,
      }
    },
    {
      price: {
        querySelector : '.popup__text--price',
        condition : offer.price,
        targetProp : 'textContent',
        targetValue : `${offer.price} ₽/ночь`,
      }
    },
    {
      type: {
        querySelector : '.popup__type',
        condition : offer.type,
        targetProp : 'textContent',
        targetValue : typesOnRus[offer.type],
      }
    },
    {
      capacity: {
        querySelector : '.popup__text--capacity',
        condition : offer.rooms || offer.guests,
        targetProp : 'textContent',
        targetValue : `${offer.rooms} комнаты для ${offer.guests} гостей`,
      }
    },
    {
      time: {
        querySelector : '.popup__text--time',
        condition : offer.checkin || offer.checkout,
        targetProp : 'textContent',
        targetValue : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
      }
    },
    {
      features: {
        querySelector : '.popup__features',
        condition : offer.features,
        targetProp : 'textContent',
        targetValue : offer.features,
      }
    },
    {
      description: {
        querySelector : '.popup__description',
        condition : offer.description,
        targetProp : 'textContent',
        targetValue : offer.description,
      }
    },
    {
      photos: {
        querySelector : '.popup__photos',
        condition : offer.photos,
        targetProp : 'src',
        targetValue : offer.photos,
      }
    },
  ];
  return props;
};

const renderFeatures = (arrFeatures, list) => {
  list.innerHTML = '';
  if(arrFeatures){
    for(let i = 0; i < arrFeatures.length; i++){
      const elList = document.createElement('li');
      elList.classList.add('popup__feature', `popup__feature--${arrFeatures[i]}`);
      list.appendChild(elList);
    }
  }
};


const renderPhotos = (arrPhotos, list, photo) => {
  list.innerHTML = '';
  if (arrPhotos) {


    for(let i = 0; i < arrPhotos.length; i++){
      const img = photo.cloneNode(true);
      img.removeAttribute('src');
      img.src = arrPhotos[i];
      list.appendChild(img);
    }
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

export { renderPosterProp, createPosterProps, fragment };
