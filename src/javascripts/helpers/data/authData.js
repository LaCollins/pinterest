import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import smash from './smash';
import singleBoard from '../../components/singleBoard/singleBoard';
import boards from '../../components/boards/boards';
import users from '../../components/users/users';

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
      users.printUserName();
      users.checkExistingProfile();
      boards.printBoardOptions('inlineFormCustomSelect2');
    } else {
      logo.removeClass('hide');
      loginDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logOut.addClass('hide');
      users.eraseUserName();
      singleBoard.makeTheBoards();
    }
  });
};

export default { checkLoginStatus };
