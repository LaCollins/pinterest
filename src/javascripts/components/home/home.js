import squid from './images/squid.png';
import utilities from '../../helpers/utilities';
import googleLogo from './images/GoogleLogo.png';
import './home.scss';

const printMainPage = () => {
  const domString = `<img id="squidPic" src=${squid}><h1 id="title">Squidterest</h1>`;
  utilities.printToDom('homePage', domString);
};

const printButton = () => {
  const domString = `<button class="btn btn-dark" id="loginButton"><img src=${googleLogo}>Login</button>`;
  utilities.printToDom('logButton', domString);
};

const printHome = () => {
  printButton();
  printMainPage();
};

export default { printHome };
