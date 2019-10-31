import 'bootstrap';
import '../styles/main.scss';
import myNavBar from './components/myNavBar/myNavBar';
import home from './components/home/home';

const init = () => {
  myNavBar.printButton();
  home.printMainPage();
};

init();
