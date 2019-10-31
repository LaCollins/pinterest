import googleLogo from './images/GoogleLogo.png';
import utilities from '../../helpers/utilities';
import './myNavBar.scss';

const printButton = () => {
  const domString = `<button class="btn btn-dark" id="loginButton"><img src=${googleLogo}>Login</button>`;
  utilities.printToDom('logButton', domString);
};

export default { printButton };
