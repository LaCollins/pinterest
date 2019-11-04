import pinData from '../../helpers/data/pinData';
import utilities from '../../helpers/utilities';

const getMyPins = (boardId) => new Promise((resolve, reject) => {
  let domString = '';
  pinData.getPinData(boardId).then((pins) => {
    pins.forEach((pin) => {
      if (boardId === pin.boardId) {
        domString += `
      <img src=${pin.imageUrl} class="card-img-top" alt="...">`;
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
