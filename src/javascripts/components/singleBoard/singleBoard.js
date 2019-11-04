import './singleBoard.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import pins from '../pins/pins';

const makeTheBoards = () => {
  smash.getCompleteBoards()
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += '<div class="card col-4">';
        domString += `<h5 class="card-title">${board.name}</h5>`;
        domString += `<div id="${board.id}"></div>`;
        domString += `<div class="card-body">
                      <p class="card-text">${board.description}</p>
                    </div>`;
        domString += '</div>';
        utilities.printToDom('board-section', domString);
        pins.getMyPins(board.id);
      });
    })
    .catch((error) => console.error(error));
};

export default { makeTheBoards };
