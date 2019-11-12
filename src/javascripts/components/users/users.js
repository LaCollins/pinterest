import './users.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import uidData from '../../helpers/data/uidData';
import userData from '../../helpers/data/userData';

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
    })
    .catch((error) => console.error(error));
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
};


export default {
  printUserName,
  checkExistingProfile,
  eraseUserName,
  createUser,
};
