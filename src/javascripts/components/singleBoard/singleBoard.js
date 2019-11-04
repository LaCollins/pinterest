import './singleBoard.scss';
import $ from 'jquery';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import pins from '../pins/pins';

const makeTheBoards = () => {
  smash.getCompleteBoards()
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `<div class="card col-4" id="${board.id}Card">`;
        domString += `<h5 class="card-title">${board.name}</h5>`;
        domString += `<div id="${board.id}imgs"></div>`;
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

const singleBoardView = () => {
  $('body').on('click', '.card', (e) => {
    const cardId = e.target.parentElement.id;
    const secondId = e.target.parentElement.parentElement.id;
    let domString = '';
    smash.getCompleteBoards().then((boards) => {
      boards.forEach((board) => {
        if (cardId === `${board.id}Card` || secondId === `${board.id}Card`) {
          domString += '<div id="buttonBox" class="container"><button class="btn btn-dark" id="goBack">All Boards</button></div>';
          domString += `<div class="card col-12" id="${board.id}Card">`;
          domString += `<h5 class="card-title">${board.name}</h5>`;
          domString += `<div id="${board.id}imgs"></div>`;
          domString += `<div class="card-body">
                        <p class="card-text">${board.description}</p>
                      </div>`;
          domString += '</div>';
          utilities.printToDom('board-section', domString);
          pins.getMyPins(board.id);
        }
      });
    });
  });
};

const returnToMain = () => {
  $('body').on('click', (e) => {
    const target = e.target.id;
    if (target === 'goBack' || target === 'sBrand') {
      makeTheBoards();
    }
  });
};

export default { makeTheBoards, singleBoardView, returnToMain };
