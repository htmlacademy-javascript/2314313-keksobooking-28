import { price } from './form-validate.js';
const sliderElement = document.querySelector('.ad-form__slider');
const START_VALUE = 5000;
const STEP = 1;
const MIN_SLIDER = 0;
const MAX_SLIDER = 100000;
price.value = 0;
noUiSlider.create(sliderElement, {
  range: {
    min : MIN_SLIDER,
    max : MAX_SLIDER,
  },
  start: START_VALUE,
  step: STEP,
  connect : 'lower',
  format : {
    to: function(value) {
      return value.toFixed(0);
    },
    from : function(value) {
      return parseFloat(value);
    }
  }
});
sliderElement.noUiSlider.on('update',() => {
  price.value = sliderElement.noUiSlider.get();
});

const onChangePrice = (evt) => sliderElement.noUiSlider.set(evt.target.value);

const enableSlider = () => {
  sliderElement.removeAttribute('disabled', 'disabled');
  price.addEventListener('input', onChangePrice);
};

const disableSlider = () => {
  sliderElement.setAttribute('disabled', 'disabled');
  price.removeEventListener('input', onChangePrice);
};

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start : START_VALUE,
  });
};

price.value = null;

export { disableSlider, enableSlider, resetSlider };
