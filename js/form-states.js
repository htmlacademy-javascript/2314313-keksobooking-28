import { changePlaceholder, form } from './form-validate.js';
import { disableSlider, enableSlider } from './slider.js';
const attributesInForm = form.querySelectorAll('fieldset');
const formMapFilters = document.querySelector('.map__filters');
const attributesInMap = formMapFilters.querySelectorAll('fieldset, select');

const beInactive = (formName, formInputs) => {
  formName.classList.add(`${formName.classList[0]}--disabled`);
  disableSlider();
  formInputs.forEach((input) => {
    input.setAttribute('disabled', 'disabled');
  }
  );
};

const blockForm = () => beInactive(form, attributesInForm);
const blockMapFilters = () => {
  beInactive(formMapFilters, attributesInMap);
};

const beActive = (formName, formInputs) => {
  formName.classList.remove(`${formName.classList[0]}--disabled`);
  enableSlider();
  formInputs.forEach((input) => {
    input.removeAttribute('disabled', 'disabled');
  }
  );
  changePlaceholder();
};

const unBlockForm = () => beActive(form, attributesInForm);
const unBlockMapFilters = () => beActive(formMapFilters, attributesInMap);

blockForm();
blockMapFilters();

export { unBlockForm, unBlockMapFilters, formMapFilters };
