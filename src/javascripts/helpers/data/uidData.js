import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUidData = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/authentication.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const demUids = response.data;
      const uids = [];
      Object.keys(demUids).forEach((fbId) => {
        demUids[fbId].id = fbId;
        uids.push(demUids[fbId]);
      });
      resolve(uids);
    })
    .catch((error) => reject(error));
});

export default { getUidData };
