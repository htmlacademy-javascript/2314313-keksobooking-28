
const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const WIDTH_OF_IMG = 70;
const HEIGHT_OF_IMG = 70;
const DEFAULT_IMG_SRC = 'img/muffin-grey.svg';
const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPicture = document.querySelector('.ad-form__upload input');
const divPicture = document.querySelector('.ad-form__photo');
const imgPicture = document.createElement('img');
imgPicture.width = WIDTH_OF_IMG ;
imgPicture.height = HEIGHT_OF_IMG ;
divPicture.appendChild(imgPicture);
const previewPicture = divPicture.querySelector('img');

const changePictures = (fileChooser, preview) =>{
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILES_TYPES.some((it) => fileName.endsWith(it));
    if(matches){
      preview.src = URL.createObjectURL(file);
    }
  });
};

const clearPictures = (img, fileInput) => {
  if(fileInput.classList.contains('ad-form-header__input')){
    img.src = DEFAULT_IMG_SRC;
  } else {
    img.src = '';
  }
};
changePictures(fileChooserAvatar, previewAvatar);
changePictures(fileChooserPicture, previewPicture);
const resetPictures = () => {
  clearPictures(previewAvatar, fileChooserAvatar);
  clearPictures(previewPicture, fileChooserPicture);
};

export { resetPictures };

