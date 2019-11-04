import 'bootstrap';
import firebase from 'firebase';
import '../styles/main.scss';
import home from './components/home/home';
import boards from './components/boards/boards';

import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import uidData from './helpers/data/uidData';
import pinData from './helpers/data/pinData';
import categoryData from './helpers/data/categoryData';
import singleBoard from './components/singleBoard/singleBoard';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  home.printMainPage();
  authData.checkLoginStatus();
  boards.printBoardView();
  uidData.getUidData();
  pinData.getPinData();
  categoryData.getCategoryData();
  singleBoard.singleBoardView();
};

init();
