//import { createAllData } from './data.js';
//import { addAd } from './ads.js';

import './form-states.js';
import './form-validate.js';
import './map.js';
import './slider.js';
import { createMarkers } from './map.js';
import { setUserFormSubmit } from './form-validate.js';
import { resetForm } from './form-reset.js';
import { showErrGet } from './message-show.js';
import { unBlockMapFilters } from './form-states.js';
//createAllData();
//addAd();
const getData = (onSucess, onError) => () => fetch('https://28.javascript.pages.academy/keksobooking/data',)
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    onSucess(data);
    unBlockMapFilters();
  })
  //console.log(data);
  //createMarkers(data);
  .catch((err) => onError(err));
const get = getData(createMarkers, showErrGet);
get();
setUserFormSubmit(resetForm);
