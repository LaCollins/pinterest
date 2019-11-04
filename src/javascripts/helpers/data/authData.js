import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import smash from './smash';
import singleBoard from '../../components/singleBoard/singleBoard';

const loginDiv = $('#loginDiv');
const boardsDiv = $('#boards');
const logOut = $('#logoutDiv');
const logo = $('#mainView');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logOut.removeClass('hide');
      logo.addClass('hide');
      smash.getCompleteBoards();
      singleBoard.makeTheBoards();
    } else {
      logo.removeClass('hide');
      loginDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logOut.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
