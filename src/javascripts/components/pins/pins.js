import $ from 'jquery';
// import firebase from 'firebase/app';
import pinData from '../../helpers/data/pinData';
import utilities from '../../helpers/utilities';
// import 'firebase/auth';
import './pins.scss';


const toggleHideOnHover = () => {
  $('.single-pin').hover(() => {
    $('.imgDelete').toggleClass('hide');
  });
};


const createPin = (e) => {
  e.stopImmediatePropagation();
  const boardId = $('#inlineFormCustomSelect2').val();
  if ($('#pin-name').val() !== '' && boardId !== 'Choose...' && $('#image-url').val() !== '' && $('#site-url').val() !== '' && $('#pin-description').val() !== '' && $('#inlineFormCustomSelect').val() !== 'Choose...') {
    const newPin = {
      name: $('#pin-name').val(),
      imageUrl: $('#image-url').val(),
      siteUrl: $('#site-url').val(),
      description: $('#pin-description').val(),
      categoryId: $('#inlineFormCustomSelect').val(),
      boardId,
    };
    pinData.addNewPin(newPin)
      .then(() => {
        $('#exampleModal').modal('hide');
        // eslint-disable-next-line no-use-before-define
        getMyPins(boardId);
      })
      .catch((error) => console.error(error));
    $('#pin-name').val('');
    $('#image-url').val('');
    $('#site-url').val('');
    $('#pin-description').val('');
    $('#inlineFormCustomSelect').val('Choose...');
    $('#inlineFormCustomSelect2').val('Choose...');
  }
};


const getMyPins = (boardId) => new Promise((resolve, reject) => {
  let domString = '';
  pinData.getPinData(boardId).then((pins) => {
    pins.forEach((pin) => {
      if (boardId === pin.boardId) {
        if ($(`#${boardId}Card`).hasClass('col-12')) {
          domString += `
          <div class="single-pin"><p id="delete-${pin.id}" class="imgDelete hide">X</p>
          <button data-toggle="modal" data-target="#pinModal" id="open-${pin.id}" class="btn pinButton"><img src=${pin.imageUrl} class="card-img-top" alt="${pin.description}"></button>
          </div>
          `;
        } else {
          domString += `
      <img src=${pin.imageUrl} class="card-img-top" alt="${pin.description}">`;
        }
      } else {
        domString += '';
      }
      resolve(domString);
      utilities.printToDom(`${boardId}imgs`, domString);
      toggleHideOnHover();
    });
  })
    .catch((error) => reject(error));
});

export default { getMyPins, createPin };
