import { price } from './form-validate.js';
const sliderElement = document.querySelector('.ad-form__slider');
price.value = 0;
noUiSlider.create(sliderElement, {
  range: {
    min : 0,
    max : 100000,
  },
  start: 5000,
  step: 1,
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

export { disableSlider, enableSlider };
