import './singleBoard.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';

const makeTheBoards = () => {
  smash.getCompleteBoards()
    .then((boards) => {
      let domString = '';
      let domString2 = '';
      boards.forEach((board) => {
        domString += '<div class="card col-4">';
        domString += `<h5 class="card-title">${board.name}</h5>`;
        domString += `<div class="card-body">
                      <p class="card-text">${board.description}</p>
                    </div>`;
        domString += `<div id="${board.id}"></div>`;
        domString += '</div>';
        utilities.printToDom('board-section', domString);
        pinData.getPinData(board.id).then((pins) => {
          pins.forEach((pin) => {
            if (board.id === pin.boardId) {
              domString2 += `
              <img src=${pin.imageUrl} class="card-img-top" alt="...">`;
              utilities.printToDom(`${pin.boardId}`, domString2);
            } else {
              domString2 += '';
            }
          });
        });
      });
    })
    .catch((error) => console.error(error));
};

export default { makeTheBoards };
