import { createMarkers, markerGroup } from './map.js';
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('#housing-features input');
const DEFAULT_FILTER = 'any';
const MAX_COUNT_MARKERS = 10;
const statesOfPriceValue = {
  'middle': {
    min : '10000',
    max : '50000',
  },
  'low' : {
    min : '0',
    max : '10000',
  },
  'high' : {
    min : '50000',
    max : '100000',
  }
};

const filterAds = (data) => {
  let ads = data;

  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');
  const featuresInput = document.querySelectorAll('#housing-features input');


  if(housingTypeInput.value !== DEFAULT_FILTER){
    ads = ads.filter(({offer}) => offer.type === housingTypeInput.value);
  }

  if(housingPriceInput.value !== DEFAULT_FILTER){
    const value = housingPriceInput.value;
    const min = statesOfPriceValue[value].min;
    const max = statesOfPriceValue[value].max;
    ads = ads.filter(({offer}) => offer.price >= min && offer.price <= max);
  }

  if(housingRoomsInput.value !== DEFAULT_FILTER) {
    ads = ads.filter(({offer}) => offer.rooms === +housingRoomsInput.value);
  }

  if(housingGuestsInput.value !== DEFAULT_FILTER) {
    const numOfInputValue = +housingGuestsInput.value;
    ads = ads.filter(({offer}) => offer.guests === numOfInputValue);
  }


  featuresInput.forEach((feature) => {
    if(feature.checked){
      ads = ads.filter((ad) => {
        const featuresOfAd = ad.offer.features;
        if(featuresOfAd){
          return featuresOfAd.includes(feature.value);
        } return false;
      }
      );
    }
  });

  markerGroup.clearLayers();

  createMarkers(ads.slice(0, MAX_COUNT_MARKERS));
};

const onClickFilter = (cb) => {
  mapFilters.forEach((el) => el.addEventListener('change', () => {
    cb();
  }));
  mapFeatures.forEach((el) => el.addEventListener('change', () => {
    cb();
  }));
};

export { filterAds, onClickFilter };
