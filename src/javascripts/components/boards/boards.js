import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import googleLogo from './images/GoogleLogo.png';
import './boards.scss';

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
  const domString = '<h1>Boards</h1>';
  utilities.printToDom('boards', domString);
};

const printBoardView = () => {
  logoutEvent();
  loginButton();
  printBoards();
};

export default { printBoardView };
