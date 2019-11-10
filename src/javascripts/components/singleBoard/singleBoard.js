import './singleBoard.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import pins from '../pins/pins';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import categoryData from '../../helpers/data/categoryData';

const editButton = (pinId) => {
  const domString = `<button type="button" class="btn btn-dark editButton" id="edit-${pinId}"><i class="fas fa-pen"></i></button>`;
  utilities.printToDom('editDiv', domString);
};


const openPin = (e) => {
  const pinId = e.target.parentElement.id.split('open-')[1];
  let domString = '';
  const { uid } = firebase.auth().currentUser;
  pinData.getAllPins()
    .then((myPins) => {
      myPins.forEach((pin) => {
        if (pinId === pin.id) {
          domString = `
        <div class="modal-header">
          <h5 class="modal-title">${pin.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
         </div>
        <div class="modal-body" id="modal-body">
          <div class="card-body"><img class="card-img" src="${pin.imageUrl}"><a href="${pin.siteUrl}" target="_blank">Go To the Website</a>
          <p><b>Description:</b> ${pin.description}</p>
          <div id="categoryContainer"></div>
          <div id="boardLocation"></div></div>
        </div>
        <div class="modal-footer">
          <div id="editDiv"></div>
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
        </div>`;
          utilities.printToDom('modalContainer', domString);
          editButton(pin.id);
          categoryData.getCategoryData()
            .then((categories) => {
              categories.forEach((category) => {
                if (category.id === pin.categoryId) {
                  const domString2 = `<p><b>Category:</b> ${category.type}</p>`;
                  utilities.printToDom('categoryContainer', domString2);
                }
                smash.getCompleteBoards(uid).then((boards) => {
                  boards.forEach((board) => {
                    if (board.id === pin.boardId) {
                      const domString3 = `<p><b>Board:</b> ${board.name}</p>`;
                      utilities.printToDom('boardLocation', domString3);
                    }
                  });
                });
              });
            });
        }
      });
    })
    .catch((error) => console.error(error));
};

const deleteBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id.split('delete-')[1];
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPinData(boardId).then((myPins) => {
        myPins.forEach((pin) => {
          pinData.deletePinData(pin.id);
        });
      });
      // eslint-disable-next-line no-use-before-define
      smash.getCompleteBoards(uid).then(() => makeTheBoards());
    })
    .catch((error) => console.error(error));
};

const deletePin = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const pinId = e.target.id.split('delete-')[1];
  const boardId = e.target.parentElement.parentElement.id.split('imgs')[0];
  pinData.deletePinData(pinId)
    .then(() => {
      smash.getCompleteBoards(uid).then((boards) => {
        boards.forEach((board) => {
          let domString = '';
          if (boardId === `${board.id}`) {
            domString += '<div id="buttonBox" class="container"><button class="btn btn-dark" id="goBack">All Boards</button></div>';
            domString += `<div class="card col-12" id="${board.id}Card">`;
            domString += `<h5 class="card-title">${board.name}</h5>`;
            domString += `<div id="${board.id}imgs" class="row"></div>`;
            domString += `<div class="card-body">
                          <p class="card-text">${board.description}</p>
                          <div class="card-footer"><button class="btn btn-dark delete-board" id="delete-${board.id}">Delete Board</button>
                          </div>
                        </div>`;
            domString += '</div>';
            utilities.printToDom('board-section', domString);
            pins.getMyPins(board.id);
            $('.col-12').on('click', '.imgDelete', deletePin);
            $('.card').on('click', '.delete-board', deleteBoard);
            $('img').on('click', openPin);
          }
        })
          .catch((error) => console.error(error));
      });
    });
};

const makeTheBoards = () => {
  const { uid } = firebase.auth().currentUser;
  smash.getCompleteBoards(uid)
    .then((boards) => {
      if (boards.length >= 1) {
        let domString = '';
        boards.forEach((board) => {
          domString += `<div class="card col-4" id="${board.id}Card">`;
          domString += `<h5 class="card-title">${board.name}</h5>`;
          domString += `<div id="${board.id}imgs" class="thumbnails"></div>`;
          domString += `<div class="card-body">
                      <p class="card-text">${board.description}</p>
                      <div class="card-footer"><button class="btn btn-dark delete-board" id="delete-${board.id}">Delete Board</button>
                      </div>
                    </div>`;
          domString += '</div>';
          utilities.printToDom('board-section', domString);
          pins.getMyPins(board.id);
          $('.card').on('click', '.delete-board', deleteBoard);
        });
      } else {
        const domString = '<h5 class="container">You have no boards</h5>';
        utilities.printToDom('board-section', domString);
      }
    })
    .catch((error) => console.error(error));
};

const singleBoardView = () => {
  $('body').on('click', '.card', (e) => {
    const { uid } = firebase.auth().currentUser;
    const cardId = e.target.parentElement.id;
    const secondId = e.target.parentElement.parentElement.id;
    let domString = '';
    smash.getCompleteBoards(uid).then((boards) => {
      boards.forEach((board) => {
        if (cardId === `${board.id}Card` || secondId === `${board.id}Card`) {
          domString += '<div id="buttonBox" class="container"><button class="btn btn-dark" id="goBack">All Boards</button></div>';
          domString += `<div class="card col-12 mb-2" id="${board.id}Card">`;
          domString += `<h5 class="card-title">${board.name}</h5>`;
          domString += `<div id="${board.id}imgs" class="row"></div>`;
          domString += `<div class="card-body">
                        <p class="card-text">${board.description}</p>
                        <div class="card-footer"><button class="btn btn-dark delete-board" id="delete-${board.id}">Delete Board</button>
                        </div>
                      </div>`;
          domString += '</div>';
          utilities.printToDom('board-section', domString);
          pins.getMyPins(board.id);
          $('.col-12').on('click', '.imgDelete', deletePin);
          $('.card').on('click', '.delete-board', deleteBoard);
          $('.card').on('click', '.pinButton', openPin);
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

export default {
  makeTheBoards,
  singleBoardView,
  returnToMain,
  editButton,
};
