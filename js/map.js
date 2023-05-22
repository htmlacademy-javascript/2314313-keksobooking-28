import { allData , renderPosterProp, createPosterProps, fragment } from './ads.js';
import { unBlockForm, unBlockMapFilters } from './form-states.js';
const addressInput = document.querySelector('#address');
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const cityCenter = {
  lat : 35.6894,
  lng :  139.692,
};


const ZOOM = 10;
const map = L.map('map-canvas')
  .on('load', () => {
    unBlockForm();
    unBlockMapFilters();
  })
  .setView(cityCenter, ZOOM);

const iconConfig = {
  url : './img/main-pin.svg',
  sizeMainIcon: [52, 52],
  sizeDefault : [40, 40],
  anchorMain: [26, 52],
  anchorDefault: [20, 40],
};

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT,
},
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl : iconConfig.url,
  iconSize : iconConfig.sizeMainIcon,
  iconAnchor : iconConfig.anchorMain,
});


const setAddressInputValue = ({ lat, lng }) => {
  addressInput.value = `${ lat.toFixed(5) } , ${ lng.toFixed(5) }`;
};
setAddressInputValue(cityCenter);

const marker = L.marker(cityCenter, {
  draggable : true,
  icon : mainPinIcon,
});
marker.addTo(map);
marker.on('moveend',(evt) => {
  const mainPinLatLng = evt.target.getLatLng();
  setAddressInputValue(mainPinLatLng);
});

const defaultIcon = L.icon({
  iconUrl : iconConfig.url,
  iconSize : iconConfig.sizeDefault,
  iconAnchor : iconConfig.anchorDefault,
});


const createCustomPopup = (point) => {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = adTemplate.cloneNode(true);
  const posterProps = createPosterProps(point);
  posterProps.forEach((item) => Object.values(item).map((value) =>{
    renderPosterProp(adElement, value);
    adElement.append(fragment);
  }
  )
  );
  return adElement;
};


allData.forEach((point) => {
  const location = point.location;
  const lat = location.lat;
  const lng = location.lng;
  const defaultMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon : defaultIcon,
    },
  );
  defaultMarker
    .addTo(map)
    .bindPopup(createCustomPopup(point));
});
