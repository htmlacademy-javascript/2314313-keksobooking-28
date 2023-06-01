import { form, changePlaceholder } from './form-validate.js';
import { resetSlider } from './slider.js';
import { formMapFilters } from './form-states.js';
import { resetMap } from './map.js';
const clearButton = document.querySelector('.ad-form__reset');
const resetForm = () => {
  form.reset();
  resetSlider();
  formMapFilters.reset();
  resetMap();
  changePlaceholder();
};

clearButton.addEventListener('click', () => resetForm());


export { resetForm };

