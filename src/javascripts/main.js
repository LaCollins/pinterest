import 'bootstrap';
import firebase from 'firebase';
import '../styles/main.scss';
import home from './components/home/home';
import boards from './components/boards/boards';

import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  home.printHome();
  boards.loginButton();
  authData.checkLoginStatus();
  boards.logoutEvent();
  boards.printBoards();
};

init();
