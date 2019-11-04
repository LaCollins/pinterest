import squid from './images/squid.png';
import utilities from '../../helpers/utilities';
import './home.scss';

const printMainPage = () => {
  const domString = `<img id="squidPic" src=${squid}><h1 id="title">Squidterest</h1>`;
  utilities.printToDom('homePage', domString);
};

export default { printMainPage };
