import './users.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import uidData from '../../helpers/data/uidData';
import userData from '../../helpers/data/userData';

const swapToBoardView = () => {
  $('#profile').addClass('hide');
  $('#boards').removeClass('hide');
};

const viewProfile = () => {
  const { uid } = firebase.auth().currentUser;
  let domString = '';
  uidData.getUidData(uid)
    .then((response) => {
      const userAuth = response[0].id;
      userData.getUserData(userAuth).then((user) => {
        domString += '<div class="container buttonCont"><button class="btn btn-dark" id="backToBoards">Back to Boards</button></div>';
        domString += '<div class="container" id="profileBox">';
        domString += `<div class="row"><strong>User Name:</strong> ${user[0].name}</div>`;
        domString += '<div class="row"></div>';
        domString += '</div>';
        utilities.printToDom('profile', domString);
        $('#profile').removeClass('hide');
        $('#boards').addClass('hide');
      });
    })
    .catch((error) => console.error(error));
  $('body').on('click', '#backToBoards', swapToBoardView);
};

const printUserName = () => {
  const { uid } = firebase.auth().currentUser;
  let domString = 'Hello, ';
  uidData.getUidData(uid)
    .then((response) => {
      const userAuth = response[0].id;
      userData.getUserData(userAuth).then((user) => {
        domString += user[0].name;
        domString += '!';
        utilities.printToDom('userName', domString);
      });
      $('#userProfileIcon').removeClass('hide');
    })
    .catch((error) => console.error(error));
  $('body').on('click', '#userProfileIcon', viewProfile);
};

const eraseUserName = () => utilities.printToDom('userName', '');

const checkExistingProfile = () => {
  const { uid } = firebase.auth().currentUser;
  uidData.getUidData(uid)
    .then((response) => {
      if (response.length < 1) {
        $('#newUserModal').modal('show');
        $('#createPinButton').attr('disabled', true);
      }
    })
    .catch((error) => console.error(error));
};

const createUser = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newAuth = {
    uid,
  };
  if ($('#user-name').val() !== '' && $('#user-image-url').val() !== '' && $('#email').val() !== '' && $('#location').val() !== '') {
    uidData.addNewAuth(newAuth)
      .then(() => {
        uidData.getUidData(uid)
          .then((response) => {
            const userAuth = response[0].id;
            const newUser = {
              name: $('#user-name').val(),
              imageUrl: $('#user-image-url').val(),
              email: $('#email').val(),
              location: $('#location').val(),
              joinDate: Date($.now()),
              uid: userAuth,
            };
            userData.addNewUserProfile(newUser);
            $('#newUserModal').modal('hide');
            printUserName();
          });
      })
      .catch((error) => console.error(error));
  }
};


export default {
  printUserName,
  checkExistingProfile,
  eraseUserName,
  createUser,
};
