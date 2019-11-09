import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import googleLogo from './images/GoogleLogo.png';
import './boards.scss';
import pins from '../pins/pins';
import categoryData from '../../helpers/data/categoryData';
import smash from '../../helpers/data/smash';


const loginDiv = $('#loginDiv');
const logoDiv = $('#mainView');
const logoutButton = $('#logoutDiv');
const boardsDiv = $('#boards');

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button class="btn btn-dark" id="loginButton"><img src=${googleLogo}>Login</button>`;
  utilities.printToDom('loginDiv', domString);
  $('#loginButton').click(signMeIn);
};

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        boardsDiv.addClass('hide');
        logoutButton.addClass('hide');
        logoDiv.removeClass('hide');
        loginDiv.removeClass('hide');
      }).catch((err) => console.error('You are still logged in', err));
  });
};

const printBoards = () => {
  let domString = '<h1>Boards</h1>';
  domString += `<button type="button" class="btn btn-dark m-2" data-toggle="modal" data-target="#exampleModal">
  Create Pin
  </button>`;
  domString += '<div id="board-section" class="d-flex flex-wrap"></div>';
  utilities.printToDom('boards', domString);
  $('#add-new-pin').click(pins.createPin);
};

const printCategoryOptions = () => {
  let domString = '<option selected>Choose...</option>';
  categoryData.getCategoryData()
    .then((categories) => {
      categories.forEach((category) => {
        domString += `<option value="${category.id}">${category.type}</option>`;
      });
      utilities.printToDom('inlineFormCustomSelect', domString);
    })
    .catch((error) => console.error(error));
};

const printBoardOptions = () => {
  const { uid } = firebase.auth().currentUser;
  let domString = '<option selected>Choose...</option>';
  smash.getCompleteBoards(uid)
    .then((boards) => {
      boards.forEach((board) => {
        domString += `<option value="${board.id}">${board.name}</option>`;
      });
      utilities.printToDom('inlineFormCustomSelect2', domString);
    })
    .catch((error) => console.error(error));
};

const printBoardView = () => {
  logoutEvent();
  loginButton();
  printBoards();
  printCategoryOptions();
};

export default { printBoardView, printBoardOptions };
