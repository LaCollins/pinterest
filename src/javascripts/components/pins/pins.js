import $ from 'jquery';
import pinData from '../../helpers/data/pinData';
import utilities from '../../helpers/utilities';
import './pins.scss';

const getMyPins = (boardId) => new Promise((resolve, reject) => {
  let domString = '';
  pinData.getPinData(boardId).then((pins) => {
    pins.forEach((pin) => {
      if (boardId === pin.boardId) {
        if ($(`#${boardId}Card`).hasClass('col-12')) {
          domString += `
          <div class="single-pin"><p id="delete-${pin.id}" class="imgDelete">X</p>
          <img src=${pin.imageUrl} class="card-img-top" alt="...">
          </div>
          `;
        } else {
          domString += `
      <img src=${pin.imageUrl} class="card-img-top" alt="...">`;
        }
      } else {
        domString += '';
      }
      resolve(domString);
      utilities.printToDom(`${boardId}imgs`, domString);
    });
  })
    .catch((error) => reject(error));
});

export default { getMyPins };
