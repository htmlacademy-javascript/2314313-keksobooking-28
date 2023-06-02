import './form-states.js';
import './form-validate.js';
import './map.js';
import './slider.js';
import { setUserFormSubmit } from './form-validate.js';
import { resetForm } from './form-reset.js';
import { showErrGet } from './message-show.js';
import { filterAds } from './filter.js';
import { getData } from './get-data.js';
import './avatar.js';

const get = getData(filterAds, showErrGet);
get();
setUserFormSubmit(resetForm);
