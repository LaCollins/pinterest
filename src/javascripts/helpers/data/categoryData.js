import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCategoryData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/categories.json`)
    .then((response) => {
      const demCategories = response.data;
      const categories = [];
      Object.keys(demCategories).forEach((fbId) => {
        demCategories[fbId].id = fbId;
        categories.push(demCategories[fbId]);
      });
      resolve(categories);
    })
    .catch((error) => reject(error));
});

export default { getCategoryData };
