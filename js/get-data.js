import { debounce } from './util.js';
import { onClickFilter } from './filter.js';
import { unBlockMapFilters } from './form-states.js';
const RERENDER_DELAY = 500;

const getData = (onSucess, onError) => () => fetch('https://28.javascript.pages.academy/keksobooking/data',)
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    throw new Error();
  })
  .then((data) => {
    onSucess(data);
    onClickFilter(debounce(() => onSucess(data), RERENDER_DELAY));
    unBlockMapFilters();
  })
  .catch((err) => onError(err));

export { getData };
