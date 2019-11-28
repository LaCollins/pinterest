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

const updateProfile = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const updatedUser = {
    name: $('#new-user-name').val(),
    imageUrl: $('#new-user-image-url').val(),
    email: $('#new-email').val(),
    location: $('#new-location').val(),
  };
  uidData.getUidData(uid)
    .then((response) => {
      const userAuth = response[0].id;
      userData.getUserData(userAuth).then((user) => {
        const userId = user[0].id;
        userData.updateUserInfo(userId, updatedUser)
          // eslint-disable-next-line no-use-before-define
          .then(() => viewProfile());
      });
    }).catch((error) => console.error(error));
};

const profileEdit = () => {
  const { uid } = firebase.auth().currentUser;
  uidData.getUidData(uid)
    .then((response) => {
      const userAuth = response[0].id;
      userData.getUserData(userAuth).then((user) => {
        const domString = `
  <form>
    <div class="form-group">
      <label for="user-name">Name</label>
      <input type="text" class="form-control" id="new-user-name" required>
    </div>
    <div class="form-group">
      <label for="email">E-Mail</label>
      <input type="text" class="form-control" id="new-email" required>
    </div>
    <div class="form-group">
      <label for="user-image-url">Profile Image Url</label>
      <input type="text" class="form-control" id="new-user-image-url" required>
    </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input type="text" class="form-control" id="new-location" required>
    </div>
  </form>`;
        utilities.printToDom('profileData', domString);
        $('#new-user-name').val(`${user[0].name}`);
        $('#new-email').val(`${user[0].email}`);
        $('#new-user-image-url').val(`${user[0].imageUrl}`);
        $('#new-location').val(`${user[0].location}`);
      });
    })
    .catch((error) => console.error(error));
  $('#editProfile').html('Save Changes');
  $('#editProfile').addClass('saveProfileChanges');
  $('body').on('click', '.saveProfileChanges', updateProfile);
};

const viewProfile = () => {
  const { uid } = firebase.auth().currentUser;
  let domString = '';
  uidData.getUidData(uid)
    .then((response) => {
      const userAuth = response[0].id;
      userData.getUserData(userAuth).then((user) => {
        domString += '<div class="container buttonCont"><button class="btn btn-dark" id="backToBoards">Back to Boards</button></div>';
        domString += `
          <div id="profileContainer">
            <div class="card mb-3 userProfileCard">
            <div class="row no-gutters">
              <div class="col-6" id="profileData">
                <div class="card-body">
                  <h5 class="card-title">${user[0].name}</h5>
                  <p class="card-text"><strong>Home Town:</strong> ${user[0].location}</p>
                  <p class="card-text"><small class="text-muted">Member Since ${user[0].joinDate}</small></p>
                </div>
              </div>
              <div class="col-md-5">
                <img src="${user[0].imageUrl}" class="card-img" alt="${user[0].name}">
              </div>
            </div>
            <div class="card-footer profileEdit"><button class="btn btn-dark" id="editProfile">Edit Profile</button>
            </div>
          </div>
          </div>`;
        utilities.printToDom('profile', domString);
        $('#profile').removeClass('hide');
        $('#boards').addClass('hide');
        $('body').on('click', '#editProfile', profileEdit);
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
      }).then(() => $('#userProfileIcon').removeClass('hide'));
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
            userData.addNewUserProfile(newUser)
              .then(() => {
                $('#newUserModal').modal('hide');
                printUserName();
              });
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
