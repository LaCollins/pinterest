import squid from './images/squid.png';
import utilities from '../../helpers/utilities';

const printMainPage = () => {
  const domString = `<img src=${squid}><h1 id="title">Squidterest</h1>`;
  utilities.printToDom('homePage', domString);
};

export default { printMainPage };
