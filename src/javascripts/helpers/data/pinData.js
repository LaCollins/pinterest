import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinData = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const deletePinData = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const updatePin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

const changeBoard = (pinId, newBoardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`)
    .then((result) => {
      const pinObject = { ...result.data };
      pinObject.boardId = newBoardId;
      updatePin(pinId, pinObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getPinData,
  deletePinData,
  addNewPin,
  getAllPins,
  changeBoard,
};
