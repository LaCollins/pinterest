import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserData = (userAuth) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${userAuth}"`)
    .then((response) => {
      const demUsers = response.data;
      const users = [];
      Object.keys(demUsers).forEach((fbId) => {
        demUsers[fbId].id = fbId;
        users.push(demUsers[fbId]);
      });
      resolve(users);
    })
    .catch((error) => reject(error));
});

// const updateProfile = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}.json`, updatedUser);

const updateUserInfo = (userId, newInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${userId}.json`)
    .then((result) => {
      const userObject = { ...result.data };
      userObject.name = newInfo.name;
      userObject.email = newInfo.email;
      userObject.imageUrl = newInfo.imageUrl;
      userObject.location = newInfo.location;
      console.log(userId, userObject);
      // updateProfile(dinoId, dinoObject)
      // .then(() => {
      //   resolve();
      // });
    })
    .catch((error) => reject(error));
});

const addNewUserProfile = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

export default { getUserData, addNewUserProfile, updateUserInfo };
