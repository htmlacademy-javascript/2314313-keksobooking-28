import { debounce } from './util.js';
import { onClickFilter } from './filter.js';
import { unlockMapFilters } from './form-states.js';
const RERENDER_DELAY = 500;
const ADDRESS_GET_DATA = 'https://28.javascript.pages.academy/keksobooking/data';

const getData = (onSucess, onError) => () => fetch(ADDRESS_GET_DATA,)
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    onSucess(data);
    onClickFilter(debounce(() => onSucess(data), RERENDER_DELAY));
    unlockMapFilters();
  })
  .catch((err) => onError(err));

export { getData };
